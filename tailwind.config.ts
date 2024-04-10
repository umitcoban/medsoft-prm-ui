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
      textColor: {
        "primary-text-color": "#424242",
        "primary-header-color": "#0D47A1",
        "primary-link-color": "#757575",
        "primary-warning-color": "#FFEB3B",
        "primary-btn-color": "#4CAF50",
      }
    },
  },
  plugins: [],
};
export default config;
