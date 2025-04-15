export default {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            textShadow: '0 0 5px #00ffcc, 0 0 10px #00ffcc',
          },
          '50%': {
            textShadow: '0 0 10px #00ffcc, 0 0 20px #00ffcc',
          },
        },
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
