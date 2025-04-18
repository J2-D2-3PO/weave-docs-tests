import {Timestamp} from '@wandb/weave/components/Timestamp';
import React from 'react';

// Seconds relative to Unix Epoch
const JAN_1_2000_S = 946_684_800;
const JAN_1_2100_S = 4_102_444_800;
const JAN_1_2000_MS = 1000 * JAN_1_2000_S;
const JAN_1_2100_MS = 1000 * JAN_1_2100_S;

// TODO: This is only looking at value, but we could also consider the value name, e.g. "created".

export const isProbablyTimestampMs = (value: number) => {
  return JAN_1_2000_MS <= value && value <= JAN_1_2100_MS;
};

export const isProbablyTimestampSec = (value: number) => {
  return JAN_1_2000_S <= value && value <= JAN_1_2100_S;
};

export const isProbablyTimestamp = (value: number) => {
  return isProbablyTimestampMs(value) || isProbablyTimestampSec(value);
};

type ValueViewNumberTimestampProps = {
  value: number;
};

export const ValueViewNumberTimestamp = ({
  value,
}: ValueViewNumberTimestampProps) => {
  const epochSeconds = value >= JAN_1_2000_MS ? value / 1000 : value;
  return <Timestamp value={epochSeconds} format="X" />;
};
