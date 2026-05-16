/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        editorial: ['"Playfair Display"', 'Georgia', '"Noto Serif SC"', 'serif'],
        sans: ['"DM Sans"', '-apple-system', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        // Obsidian palette
        void: {
          DEFAULT: '#08070b',
          50: '#1c1b25',
          100: '#15141c',
          200: '#0e0d13',
          300: '#08070b',
        },
        surface: {
          DEFAULT: '#15141c',
          elevated: '#1c1b25',
          card: 'rgba(28, 27, 37, 0.65)',
        },
        // Warm amber accent
        amber: {
          accent: '#d4a853',
          light: '#e8c677',
          muted: 'rgba(212, 168, 83, 0.15)',
          glow: 'rgba(212, 168, 83, 0.3)',
        },
        // Text hierarchy
        ink: {
          bright: '#f0ece4',
          primary: '#c8c2b4',
          secondary: '#8a8478',
          muted: '#5a5650',
        },
        // Category accents
        cat: {
          language: '#7eb8da',
          image: '#c9849e',
          coding: '#7ecba1',
          data: '#d4a853',
        },
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.25)',
        'card-hover': '0 16px 48px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(212, 168, 83, 0.08)',
        'glow-amber': '0 0 20px rgba(212, 168, 83, 0.15), 0 0 40px rgba(212, 168, 83, 0.05)',
        'input-focus': '0 0 0 3px rgba(212, 168, 83, 0.15), 0 0 24px rgba(212, 168, 83, 0.06)',
      },
      animation: {
        'glow-pulse': 'glow-breathe 3s ease-in-out infinite',
        'float': 'float-gentle 8s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out both',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'slide-in-left': 'slide-in-left 0.3s ease-out both',
        'card-enter': 'slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      keyframes: {
        'glow-breathe': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '20px',
      },
    },
  },
  plugins: [],
}
