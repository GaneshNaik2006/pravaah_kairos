/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          darkest: "#020208",
          dark: "#060616",
          card: "#0d0d26",
          border: "rgba(103, 232, 249, 0.15)",
        },
        kairos: {
          cyan: "#22d3ee",
          neon: "#06b6d4",
          purple: "#a855f7",
          deepPurple: "#6d28d9",
          magenta: "#ec4899",
          gold: "#fbbf24",
          blue: "#3b82f6",
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 25s linear infinite',
        'spin-reverse-slow': 'spin-reverse 35s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s infinite ease-in-out',
        'warp-lines': 'warpLines 2s linear infinite',
        'orbit-rotate': 'orbitRotate 40s linear infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.6))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.9))' },
        },
        warpLines: {
          '0%': { transform: 'translateZ(0px) scale(1)' },
          '100%': { transform: 'translateZ(1000px) scale(3)' },
        },
        orbitRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(ellipse at center, rgba(109, 40, 217, 0.25) 0%, rgba(6, 6, 22, 0.8) 60%, rgba(2, 2, 8, 1) 100%)',
        'neon-border': 'linear-gradient(135deg, rgba(34, 211, 238, 0.5), rgba(168, 85, 247, 0.5))',
        'gold-glow': 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
