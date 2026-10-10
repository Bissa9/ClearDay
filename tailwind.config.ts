import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: { colors: { ink: "#18231f", muted: "#6f7b75", paper: "#f5f7f3", leaf: "#39765b", lime: "#d7f36b" }, boxShadow: { soft: "0 14px 40px rgba(24,35,31,.07)" } } },
  plugins: []
};
export default config;
