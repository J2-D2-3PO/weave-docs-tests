/**
 * KEEP THIS FILE IN SYNC WITH THE ONE IN CORE APP
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    /**
     * This overrides Tailwind's default spacing system.
     * Inherited by padding, margin, width, height, maxHeight, gap,
     * inset, space, translate, scrollMargin, and scrollPadding
     */
    boxShadow: {
      none: 'none',
      flat: '0px 4px 8px 0px #0D0F120a', // oblivion 4%
      medium: '0px 12px 24px 0px #0D0F1229', // oblivion 16%
      deep: '0px 24px 48px 0px #0D0F123d', // oblivion 24%

      // deprecated shadow configs
      md: '0px 12px 24px 0px #15181F29', // use shadow-medium instead
      lg: '0px 24px 48px 0px #15181F29', // use shadow-deep instead
    },
    spacing: {
      0: '0rem',
      px: '0.063rem',
      1: '0.063rem',
      2: '0.125rem',
      3: '0.188rem',
      4: '0.25rem',
      5: '0.313rem',
      6: '0.375rem',
      7: '0.438rem',
      8: '0.5rem',
      10: '0.625rem',
      12: '0.75rem',
      14: '0.875rem',
      16: '1rem',
      18: '1.125rem',
      20: '1.25rem',
      22: '1.375rem',
      24: '1.5rem',
      26: '1.625rem',
      28: '1.75rem',
      30: '1.875rem',
      32: '2rem',
      34: '2.125rem',
      36: '2.25rem',
      38: '2.375rem',
      40: '2.5rem',
      44: '2.75rem',
      48: '3rem',
      56: '3.5rem',
      60: '3.75rem',
      64: '4rem',
      72: '4.5rem',
      80: '5rem',
      96: '6rem',
      // Breakpoints
      768: '48rem',
      1024: '64rem',
      1280: '80rem',
    },
    /**
     * Keep these colors in sync with what is in color.styles.ts
     */
    colors: {
      inherit: 'inherit',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      moonbeam: '#F1EFF8',
      oblivion: '#0D0F12',
      moon: {
        50: '#FDFDFD',
        100: '#F8F8F8',
        150: '#F0F0F0',
        200: '#E8E8E9',
        250: '#DFE0E2',
        300: '#D4D5D9',
        350: '#C5C7CC',
        400: '#B1B4B9',
        450: '#8F949E',
        500: '#79808A',
        550: '#676D78',
        600: '#565C66',
        650: '#4B535C',
        700: '#3F464F',
        750: '#363C44',
        800: '#2B3038',
        850: '#20242B',
        900: '#1A1D24',
        950: '#171A1F',
      },
      teal: {
        300: '#A9EDF2',
        350: '#88E4EB',
        400: '#58D3DB',
        450: '#10BFCC',
        500: '#13A9BA',
        550: '#0097AB',
        600: '#038194',
        650: '#096A7A',
        700: '#155B69',
      },
      green: {
        300: '#A1F0CB',
        350: '#85E5BC',
        400: '#5ED6A4',
        450: '#28C787',
        500: '#00B26E',
        550: '#009962',
        600: '#00875A',
        650: '#0B7052',
        700: '#165745',
      },
      cactus: {
        300: '#D0ED9D',
        350: '#C6EB83',
        400: '#BBE06B',
        450: '#A5D154',
        500: '#92C23A',
        550: '#7AA638',
        600: '#5F8A2D',
        650: '#496B22',
        700: '#3D541D',
      },
      gold: {
        300: '#FFE49E',
        350: '#FFDD80',
        400: '#FFCF4D',
        450: '#FAC13C',
        500: '#F5A822',
        550: '#D4870D',
        600: '#B8740F',
        650: '#8F5E14',
        700: '#694919',
      },
      sienna: {
        300: '#FFCFB2',
        350: '#FFBA91',
        400: '#FCA36F',
        450: '#FC8F58',
        500: '#F27641',
        550: '#D96534',
        600: '#C2562F',
        650: '#994228',
        700: '#703726',
      },
      red: {
        300: '#FFC7CA',
        350: '#FFA8B0',
        400: '#FF7A88',
        450: '#FF596D',
        500: '#FF3D5A',
        550: '#E3324F',
        600: '#CC2944',
        650: '#A32740',
        700: '#782637',
      },
      magenta: {
        300: '#EFC2FC',
        350: '#E7A7FC',
        400: '#E180FF',
        450: '#D869FA',
        500: '#CB51F0',
        550: '#BC45E5',
        600: '#9E36C2',
        650: '#7A2C94',
        700: '#602973',
      },
      purple: {
        300: '#D6C9FF',
        350: '#C2B1FC',
        400: '#B199FF',
        450: '#9D80FF',
        500: '#8465F0',
        550: '#7251E0',
        600: '#6645D1',
        650: '#5539B2',
        700: '#4B3791',
      },
      blue: {
        300: '#BDD9FF',
        350: '#A4C9FC',
        400: '#7DB1FA',
        450: '#629DF5',
        500: '#397EED',
        550: '#286CE0',
        600: '#1F59C4',
        650: '#19469E',
        700: '#193C80',
      },
    },
    extend: {
      animation: {
        wave: 'wave 3s linear  infinite',
      },
      keyframes: {
        wave: {
          '0%, 30%, 100%': {
            transform: 'initial',
          },
          '15%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      opacity: {
        35: '.35',
      },
    },
  },
  plugins: [require('tailwindcss-radix')],
  corePlugins: {
    /*
    we disable preflight since it resets CSS styles for base html elements, and that will mess with
    the layout/appearance of the site as a whole.
    */
    preflight: false,
    /* we disable container since for some reason it does not follow the important selector strategy  (ie
       its css selector doesn't get prefixed with .tw-style */
    container: false,
  },
  /* we use this so tailwind styles all require that they have an element with the tw-style somewhere
     in their parent hierarchy */
  important: '.tw-style',
  experimental: {
    optimizeUniversalDefaults: true,
  },
};
