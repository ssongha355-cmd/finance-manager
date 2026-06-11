/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 0.25s ease-out forwards',
        fadeIn: 'fadeIn 0.2s ease-out forwards',
        pulseRing: 'pulse-ring 2s infinite'
      },
      keyframes: {
        slideUp: {
          'from': { transform: 'translateY(100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(217, 70, 239, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(217, 70, 239, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(217, 70, 239, 0)' }
        }
      }
    }
  },
  plugins: []
}
