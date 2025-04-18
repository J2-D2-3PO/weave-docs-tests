import typing

import pyarrow as pa
from pyarrow import compute as pc

from weave_query import weave_types as types
from weave_query import graph
from weave_query.arrow.list_ import ArrowWeaveList


# Reimplementation of Weave0 `toSafeCall` which
# converts media to their digest
def _to_compare_safe_call(node: graph.OutputNode) -> graph.OutputNode:
    from weave_query.ops_domain.wbmedia import ArtifactAssetType
    from weave_query.ops_primitives.dict import dict_

    node_type = types.non_none(node.type)
    if ArtifactAssetType.assign_type(node_type):
        # Must add this to all assets before merging
        return node.sha256  # type: ignore
    elif types.TypedDict({}).assign_type(node_type):
        new_keys = {}
        dirty = False
        for key in node_type.property_types.keys():  # type: ignore
            sub_key = node[key]  # type: ignore
            new_val = _to_compare_safe_call(sub_key)
            new_keys[key] = new_val
            if new_val is not sub_key:
                dirty = True
        if dirty:
            return dict_(**new_keys)
    elif types.List().assign_type(node_type):
        # AWL does not like joining on lists.
        return node.joinToStr(",")  # type: ignore
    return node


def _eq_null_consumer_helper(
    lhs: pa.Array, rhs: typing.Union[pa.Array, pa.Scalar]
) -> typing.Tuple[pa.Array, pa.Array]:
    # consume nulls

    self_is_null = pc.is_null(lhs)
    other_is_null = pc.is_null(rhs)
    one_null = pc.xor(self_is_null, other_is_null)
    both_null = pc.and_(self_is_null, other_is_null)

    return one_null, both_null


def not_equal(lhs: pa.Array, rhs: typing.Union[pa.Array, pa.Scalar]) -> pa.Array:
    # this unboxes the null scalar if it is boxed
    if rhs == None:
        rhs = None

    if isinstance(lhs, pa.NullArray) and (isinstance(rhs, pa.NullArray) or not rhs):
        return pc.fill_null(pc.cast(lhs, pa.bool_()), False)

    one_null, both_null = _eq_null_consumer_helper(lhs, rhs)
    result = pc.not_equal(lhs, rhs)
    result = pc.replace_with_mask(result, both_null, False)
    result = pc.replace_with_mask(result, one_null, True)
    return result


def equal(lhs: pa.Array, rhs: typing.Union[pa.Array, pa.Scalar]) -> pa.Array:
    # this unboxes the null scalar if it is boxed
    if rhs == None:
        rhs = None

    one_null, both_null = _eq_null_consumer_helper(lhs, rhs)
    result = pc.equal(lhs, rhs)
    result = pc.replace_with_mask(result, both_null, True)
    result = pc.replace_with_mask(result, one_null, False)
    return result


def handle_dictionary_array(
    self: ArrowWeaveList,
    operation: typing.Callable,
    output_type: types.Type,
    *args,
    **kwargs,
) -> ArrowWeaveList:
    if isinstance(self._arrow_data, pa.DictionaryArray):
        return ArrowWeaveList(
            pa.DictionaryArray.from_arrays(
                self._arrow_data.indices,
                operation(self._arrow_data.dictionary, *args, **kwargs),
            ),
            output_type,
            self._artifact,
        )
    return ArrowWeaveList(
        operation(self._arrow_data, *args, **kwargs),
        output_type,
        self._artifact,
    )
