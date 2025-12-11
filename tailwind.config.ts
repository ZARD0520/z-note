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
    },
  },
  plugins: [],
}
export default config
