// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your exact Figma palette
        cello:      "#1F3F5C",   // Primary text / headings
        accent:     "#0082FB",   // CTA blue
        slate:      "#6C7A89",   // Muted text
        border:     "#EAEDF0",   // Borders / lines
        snuff:      "#D6CEE5",   // Subtle bg
        surface:    "#F9FAFB",   // Light bg / button text
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-1.5px",       // Your heading tracking
      },
      fontSize: {
        "heading-1": ["64px", { lineHeight: "70px", letterSpacing: "-1.5px" }],
        "body-lg":   ["18px", { lineHeight: "31px" }],
        "label":     ["14px", { lineHeight: "24px" }],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        pill: "100px",           // Your CTA button radius
        card: "13px",            // Your image card radius
      },
      boxShadow: {
        cta: "0px 33px 13px rgba(192,191,195,0.03), 0px 19px 11px rgba(192,191,195,0.09), inset 0px 8px 8px rgba(192,191,195,0.16)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;