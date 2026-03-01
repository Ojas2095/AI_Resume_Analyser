/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066CC',
          rgb: '0, 102, 204',
        },
        secondary: {
          DEFAULT: '#FF9900',
          rgb: '255, 153, 0',
        },
        background: {
          light: 'rgb(247, 249, 252)',
          dark: 'rgb(7, 12, 22)',
        },
        foreground: {
          light: 'rgb(15, 23, 42)',
          dark: 'rgb(226, 232, 240)',
        },
        surface: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(10, 18, 34)',
        },
      },
      backgroundImage: {
        'primary-to-secondary': 'linear-gradient(to right, #0066CC, #FF9900)',
      },
      backdropBlur: {
        '16': '16px',
      },
    },
  },
  plugins: [],
}

