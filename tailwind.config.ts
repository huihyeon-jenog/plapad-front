import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'primary-color': '#7B68EE',
        'light-gray-1': '#F5F5F5',
        'light-gray-2': '#EFEFEF',
        'light-gray-3': '#C0BFBD'
      },
    },
  },
  plugins: [],
};
export default config;
