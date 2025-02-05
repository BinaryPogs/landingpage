import type { Config } from "tailwindcss";
import { themeConfig } from "./src/app/conf/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
  },
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
  // Performance optimizations
  blocklist: [
    'container',
    'space',
    'divide',
    'ring',
  ],
  safelist: [
    'bg-background-base',
    'font-twk',
    'font-sans',
  ],
  darkMode: 'class',
  important: true,
};

export default config;