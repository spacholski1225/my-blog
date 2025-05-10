/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#121212',
          light: '#1a1a1a',
        },
        text: {
          DEFAULT: '#eeeeee',
        },
        accent: {
          primary: '#6c63ff',
          secondary: '#0099ff',
        },
        surface: {
          DEFAULT: '#242424',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neumorphic-light': '5px 5px 10px #0d0d0d, -5px -5px 10px #171717',
        'neumorphic-dark': 'inset 5px 5px 10px #0d0d0d, inset -5px -5px 10px #171717',
        'neumorphic-flat': '0px 0px 0px #0d0d0d, 0px 0px 0px #171717',
        'neumorphic-concave': 'inset 5px 5px 10px #0d0d0d, inset -5px -5px 10px #171717, 5px 5px 10px #0d0d0d, -5px -5px 10px #171717',
      },
    },
  },
  plugins: [],
}