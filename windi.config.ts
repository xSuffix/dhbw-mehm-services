import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  darkMode: 'class',
  // https://windicss.org/posts/v30.html#attributify-mode
  attributify: true,

  plugins: [
    typography({
      dark: true,
    }),
  ],
  theme: {
    extend: {
      colors: {
        border: colors.dark,
        void: {
          100: '#99C8FF',
          200: '#6891C0',
          300: '#45678E',
          400: '#2F4B6B',
          500: '#1E354F',
          600: '#13263B',
          700: '#0C1A2B',
          800: '#071321',
          900: '#040E19',
        },
        root: {
          100: '#FF5D7D',
          200: '#C0415A',
          300: '#8E2C40',
          400: '#6B1F2E',
          500: '#4F1520',
          600: '#3B0E17',
          700: '#2B0910',
          800: '#21060B',
          900: '#190408',
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
        xl: '80rem',
      },
    },
  },
})
