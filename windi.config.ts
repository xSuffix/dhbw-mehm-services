import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,

  plugins: [
    typography(),
  ],
  theme: {
    extend: {
      colors: {
        border: colors.dark,
        voida: {
          100: '#1D2D63',
          200: '#172650',
          300: '#101E3D',
          400: '#0A162A',
          500: '#071220',
          600: '#05101B',
          700: '#030E16',
          800: '#030D14',
          900: '#030C12',
        },
        void: {
          100: '#1A2B64',
          200: '#13234D',
          300: '#0E1C3B',
          400: '#0A162B',
          500: '#071221',
          600: '#06101C',
          700: '#040E17',
          800: '#040D14',
          900: '#030C12',
        },
      },
      fontFamily: {
        play: ['"Press Start 2P"', 'cursive'],
      },
      lineHeight: {
        logo: '1.125',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'inherit',
            a: {
              'color': 'inherit',
              'opacity': 0.75,
              'fontWeight': '500',
              'textDecoration': 'underline',
              '&:hover': {
                opacity: 1,
                color: colors.teal[600],
              },
            },
            b: { color: 'inherit' },
            strong: { color: 'inherit' },
            em: { color: 'inherit' },
            h1: { color: 'inherit' },
            h2: { color: 'inherit' },
            h3: { color: 'inherit' },
            h4: { color: 'inherit' },
            code: { color: 'inherit' },
          },
        },
      },
      textShadow: {
        outline: '-1px -1px 0 #222, 0 -1px 0 #222, 1px -1px 0 #222, 1px 0 0 #222, 1px 1px 0 #222, 0 1px 0 #222, -1px 1px 0 #222',
      },
    },
    container: {
      padding: '1rem',
      screens: {
        sm: '100%',
        xl: '80rem',
      },
    },
  },
})
