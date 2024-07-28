import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        sidebarBackground: "hsl(0,0%,12%)",
        cardsBackground: "hsl(0,0%,13%)",
        mainBackground: "hsl(0,0%,10%)",
        headerText: "#f2f2f2",
        subtitleText: "#bfbfbf",
      },
    },
  },
  plugins: [],
};
export default config;
