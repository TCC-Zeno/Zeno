/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary))',
        secondary: 'rgb(var(--color-secondary))',
        background: 'rgb(var(--color-background))',
        backgroundSecondary: 'rgb(var(--color-background-secondary))',
      },
      fontFamily: {
        louis: ['"Louis George Café"', 'sans-serif'],
        coolvetica: ['"Coolvetica Rg"', 'sans-serif'],
      },
    }
  },
  darkMode: "class",
  plugins: [], 
}