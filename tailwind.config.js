/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      },
      colors: {
        night: '#0b1021',
        'night-500': '#11172d',
        'night-400': '#1b2441',
        accent: '#52e1e2',
        'accent-2': '#6f7cff'
      },
      boxShadow: {
        glow: '0 20px 80px rgba(82, 225, 226, 0.18)'
      }
    }
  },
  plugins: []
};
