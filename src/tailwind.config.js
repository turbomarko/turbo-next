/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D0A7A0',
        secondary: '#A02020',
        tertiary: '#A0A7D0',
        card: '#E0D0E0',
        background: '#181010',
        footer: '#4D1E30',
      },
      fontFamily: {
        marige: ['var(--font-marige)'],
        helvetica: ['var(--font-helvetica)'],
        helveticaBold: ['var(--font-helveticaBold)'],
      },
    },
  },
  plugins: [],
}
