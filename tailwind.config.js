module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'wpi-red': '#AC2B37',
        'wpi-gray': '#A9B0B7'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
