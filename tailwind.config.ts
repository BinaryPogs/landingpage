import type { Config } from "tailwindcss";
import { themeConfig } from "./src/app/conf/theme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-base': themeConfig.colors.background.base,
        'background-gradient-from': themeConfig.colors.background.gradient.from,
        'background-gradient-to': themeConfig.colors.background.gradient.to,
      },
      fontFamily: {
        twk: ['TWK Everett', 'sans-serif'],
        sans: ['TWK Everett', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;