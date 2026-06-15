/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3B',
          50: '#1A3A5C',
          100: '#163352',
          200: '#122C48',
          300: '#0E253E',
          400: '#0B1F3B',
          500: '#081931',
          600: '#051327',
          700: '#020D1D',
          800: '#000713',
          900: '#000109',
        },
        orange: {
          DEFAULT: '#FF6A00',
          50: '#FFE5CC',
          100: '#FFD9B3',
          200: '#FFC180',
          300: '#FFAA4D',
          400: '#FF931A',
          500: '#FF6A00',
          600: '#CC5500',
          700: '#994000',
          800: '#662B00',
          900: '#331600',
        },
        accent: {
          blue: '#2F80ED',
        },
        background: {
          DEFAULT: '#F7F9FC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 8px 40px rgba(11, 31, 59, 0.08)',
        'card': '0 4px 24px rgba(11, 31, 59, 0.06)',
        'card-hover': '0 12px 48px rgba(11, 31, 59, 0.12)',
        'glow-orange': '0 0 30px rgba(255, 106, 0, 0.3)',
        'glow-blue': '0 0 30px rgba(47, 128, 237, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
