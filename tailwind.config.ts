import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#468172',
          50: '#EBF2EF',
          100: '#D7E5E0',
          200: '#B0CBC1',
          300: '#88B1A2',
          400: '#619784',
          500: '#468172',
          600: '#386656',
          700: '#2A4C3F',
          800: '#1C3227',
          900: '#0E1914',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.4' },
          '100%': { transform: 'translateY(-10px) scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        steam: 'steam 2s ease-out infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
} satisfies Config;

export default config;
