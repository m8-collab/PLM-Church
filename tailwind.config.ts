import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: "#1a3d2b",
        greenlight: "#2a5a40",
        gold: "#c9913d",
        goldlight: "#e8b86d",
        cream: "#fdf8f2",
        surface: "#f4ede0",
        clay: "#e8d5b7",
        ink: "#2d2419",      // primary text
        inkmuted: "#6b5744", // muted text
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        body: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
