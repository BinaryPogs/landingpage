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
        sans: ['var(--font-cabinet)', 'system-ui', 'sans-serif'],
      },
    },
  },
  safelist: [
    'bg-background-base',
    'animate-scroll',
    'animate-pulse',
    'fixed',
    'absolute',
    'relative',
    'flex',
    'block',
    // Opacity classes
    {
      pattern: /opacity-[0-9]+/,
    },
    // Transform classes
    {
      pattern: /transform-./,
    },
  ],
  plugins: [],
  blocklist: [
    'container',
    'space',
    'divide',
    'ring',
  ],
  darkMode: 'class',
  important: true,
};

export default config;