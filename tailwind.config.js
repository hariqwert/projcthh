/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./consumet.html",
    "./consumet-app.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#07070b',
        surface: '#0f0f17',
        'surface-elevated': '#181824',
        'surface-card': '#14141f',
        accent: {
          DEFAULT: '#ff2e93',
          hover: '#ff4da6',
          glow: 'rgba(255, 46, 147, 0.35)',
        },
        'accent-cyan': {
          DEFAULT: '#00f0ff',
          hover: '#33f3ff',
          glow: 'rgba(0, 240, 255, 0.35)',
        },
        'accent-amber': {
          DEFAULT: '#ffaa00',
          hover: '#ffbb33',
          glow: 'rgba(255, 170, 0, 0.35)',
        },
        'accent-emerald': {
          DEFAULT: '#10b981',
          hover: '#34d399',
          glow: 'rgba(16, 185, 129, 0.35)',
        },
        'border-glass': 'rgba(255, 255, 255, 0.08)',
        'border-glass-bright': 'rgba(255, 255, 255, 0.16)',
      },
      fontFamily: {
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'radar-sweep': 'radarSweep 4s linear infinite',
      }
    },
  },
  plugins: [],
}
