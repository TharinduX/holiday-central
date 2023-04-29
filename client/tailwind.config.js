/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0077b6',
        secondary: '#023e8a',
        borderColor: '#ffb703',
        textPrimary: '#1E1B1D',
        textWhite: '#FFFFFF',
        cardShaddow: '#F7F8F9',
      },
    },
  },
  plugins: [],
};
