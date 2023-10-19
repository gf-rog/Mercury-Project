/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Open Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial'],
    },
    colors: {
      "my-orange": "#FF8001",
      "my-purple": "#2E0B51",
      "my-dark":"#21262D",
      "my-darker":"#121519",
      "my-light":"#EDE9E9",
      "my-lighter": "#F4F4F4",

    },
    extend: {},
  },
  plugins: [],
}

