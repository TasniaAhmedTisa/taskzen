/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure this matches your file structure
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui], // DaisyUI plugin
};
