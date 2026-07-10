/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAF8F5',
        primary: '#1B1B1B',
        secondary: '#777777',
        accent: '#A67C52',
        border: '#E7E3DD',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'EB Garamond', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title': ['2rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.7' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },
      maxWidth: {
        'prose-wide': '85ch',
        'content': '1200px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
};
