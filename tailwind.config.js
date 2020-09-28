// import tailwindTypography from '@tailwindcss/typography'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  prefix: '',
  important: false,
  separator: ':',
  theme: {
    ...defaultTheme,
  },
  variants: {},
  plugins: [],
  // tailwindcss: {
  //   config: {
  //     plugins: [tailwindTypography]
  //   }
  // },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
}
