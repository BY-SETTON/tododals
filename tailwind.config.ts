import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          '50': '#f4f9f4',
          '100': '#e5f3e7',
          '200': '#cce6cf',
          '300': '#a4d1aa',
          '400': '#74b47d',
          '500': '#50975b',
          '600': '#3e7b47',
          '700': '#33623b',
          '800': '#2c4f31',
          '900': '#26412b',
          '950': '#17301c',
        },
        base: {
          '50': '#f0fafb',
          '100': '#d8f0f5',
          '200': '#b7e2ea',
          '300': '#85ccdb',
          '400': '#4fb0c6',
          '500': '#3092aa',
          '600': '#2a7790',
          '700': '#286176',
          '800': '#285162',
          '900': '#264553',
          '950': '#142c38',
        },
        neutral: {
          '50': '#fafaff',
          '100': '#dbdbfe',
          '200': '#bfbffe',
          '300': '#9397fd',
          '400': '#6062fa',
          '500': '#463bf6',
          '600': '#3e25eb',
          '700': '#3e1dd8',
          '800': '#3b1eaf',
          '900': '#311e8a',
          '950': '#241754',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
