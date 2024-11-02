import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-bg-color": "#E3F2FD",
      },
      backgroundColor: {
        "light": "#f0f8ff"
      },
      textColor: {
        "primary-text-color": "#424242",
        "primary-header-color": "#0056b3",
        "primary-link-color": "#757575",
        "primary-warning-color": "#FFEB3B",
        "primary-btn-color": "#4CAF50",
        "paragraph-color": "##333"
      },
      fontFamily: {

      }
    },
  },
  plugins: [],
};
export default config;
