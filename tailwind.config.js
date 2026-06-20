/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './**/*.html',
    './assets/js/**/*.js',
    './app/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#77d202',
          dark: '#5aaa00',
          light: '#a3e84a',
        },
        surface: {
          light: '#f3f5f6',
          dark: '#0f1010',
        },
        'raised-dark': '#1a1c1c',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #77d202 0%, #3a6b00 50%, #000000 100%)',
        'brand-gradient-h': 'linear-gradient(90deg, #77d202, #000000)',
        'brand-gradient-v': 'linear-gradient(180deg, #77d202, #000000)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(119, 210, 2, 0.25)',
        'glow-lg': '0 0 40px rgba(119, 210, 2, 0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'key-press': 'keyPress 0.1s ease-in-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        keyPress: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.94)' },
          '100%': { transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(119, 210, 2, 0.25)' },
          '50%': { boxShadow: '0 0 40px rgba(119, 210, 2, 0.45)' },
        },
      },
    },
  },
  plugins: [],
};
