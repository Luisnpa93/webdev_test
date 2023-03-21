module.exports = {
  mode: 'jit', // enable just-in-time mode
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // specify the files to scan for class names
  darkMode: 'media', // enable dark mode
  theme: {
    extend: {
      colors: {
        primary: '#0d47a1',
        secondary: '#9fa8da',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
