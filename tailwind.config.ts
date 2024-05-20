import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      backgroundImage: {
        "custom-bg": "url('/wallpaper.jpeg')",
      },
      textShadow: {
        "outline-black": "2px 2px 0 #000",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: any) {
      const newUtilities = {
        ".text-outline-black": {
          textShadow:
            "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
export default config;
