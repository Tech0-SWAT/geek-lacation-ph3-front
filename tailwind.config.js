/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        base: {
          DEFAULT: '#FFFFFF',
          primary: '#747474',
          secondary: '#F2F6F9',
        },
        accent: {
          DEFAULT: '#222222',
        },
        progress: {
          DEFAULT: '#0273E2',
        },
        warning: {
          DEFAULT: '#F5A425',
        },
        error: {
          DEFAULT: '#FF0000',
        },
      },
      screens: {
        phone: "390px",
        pc: "1512px",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}