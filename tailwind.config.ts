import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fbf7f0",
        blush: "#f8e6e8",
        roseSoft: "#e9a8b2",
        ink: "#34302f",
        muted: "#746b68",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(62, 48, 45, 0.08)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;
