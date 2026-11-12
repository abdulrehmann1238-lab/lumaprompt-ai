/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF8F5',
          secondary: '#F2EEE8',
        },
        surface: '#FFFFFF',
        charcoal: {
          DEFAULT: '#292722',
          muted: '#817B73',
        },
        rose: {
          DEFAULT: '#9B7775',
          hover: '#886563',
          soft: '#E9DAD5',
          light: '#F6EFEC',
        },
        sage: {
          DEFAULT: '#A7AD9A',
          soft: '#EAEDE5',
          success: '#728C75',
        },
        plum: {
          DEFAULT: '#50434F',
          hover: '#3F343E',
          soft: '#EFECEF',
        },
        border: {
          DEFAULT: '#E9E4DC',
          strong: '#D8D0C4',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', ' Cambria', 'serif'],
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'editorial': '0 4px 20px -2px rgba(41, 39, 34, 0.04), 0 1px 3px 0 rgba(41, 39, 34, 0.02)',
        'editorial-hover': '0 10px 28px -4px rgba(41, 39, 34, 0.07), 0 2px 6px 0 rgba(41, 39, 34, 0.03)',
        'editorial-lg': '0 20px 45px -10px rgba(41, 39, 34, 0.08), 0 4px 12px -2px rgba(41, 39, 34, 0.03)',
      },
      borderRadius: {
        'card': '14px',
        'panel': '22px',
      }
    },
  },
  plugins: [],
}

