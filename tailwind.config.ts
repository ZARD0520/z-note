import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary-color)',
          text: 'var(--primary-text-color)',
          hover: 'var(--hover-color)',
          disabled: 'var(--disabled-color)',
          background: 'var(--background-base)',
          border: 'var(--border-color)',
        },
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
