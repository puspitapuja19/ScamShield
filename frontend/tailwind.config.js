/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        navy: {
          950: '#0A0F1E',
          900: '#0D1117',
          800: '#111827',
          700: '#1F2937',
        },
        // Primary
        purple: {
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        // Risk colors
        risk: {
          high: '#EF4444',
          medium: '#F59E0B',
          low: '#10B981',
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'glow-purple': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.3)',
        'glow-green': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #7C3AED, #3B82F6)',
        'gradient-dark': 'linear-gradient(135deg, #0A0F1E, #111827)',
      }
    },
  },
  plugins: [],
}
