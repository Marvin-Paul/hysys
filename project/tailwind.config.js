/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          50: '#e6f0fa',
          100: '#b3d4f0',
          200: '#80b8e6',
          300: '#4d9cdc',
          400: '#2680d2',
          500: '#0b5394',
          600: '#09407a',
          700: '#072d60',
          800: '#052046',
          900: '#03132d',
        },
        accent: {
          cyan: '#00a3e0',
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
