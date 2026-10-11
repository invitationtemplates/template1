import type { Config } from "tailwindcss";

// Palette sampled from the reference: warm cream paper, blush/peach panels, antique gold, cocoa brown text.
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FEF8EE", warm: "#FCEEDF", peach: "#F9E2D3", blush: "#F6D5C8", rose: "#F0BFB2" },
        gold: { DEFAULT: "#B8863B", light: "#D9B26B", soft: "#E8D0A2", deep: "#9A6E27" },
        cocoa: { DEFAULT: "#5A2E1E", soft: "#7B5646", mute: "#9A7A6A" },
      },
      fontFamily: {
        script: ['"Great Vibes"', "cursive"],
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"Cormorant Garamond"', "Georgia", "serif"],
        text: ["Lora", "Georgia", "serif"],
        arabic: ["Amiri", "serif"],
      },
      boxShadow: {
        card: "0 10px 28px -14px rgba(120, 70, 40, 0.35)",
        soft: "0 6px 18px -10px rgba(120, 70, 40, 0.28)",
      },
      keyframes: {
        swing: { "0%, 100%": { transform: "rotate(-3.5deg)" }, "50%": { transform: "rotate(3.5deg)" } },
        sway: { "0%, 100%": { transform: "rotate(-1.2deg)" }, "50%": { transform: "rotate(1.2deg)" } },
        petal: {
          "0%": { transform: "translate3d(0, -10%, 0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "0.85" },
          "100%": { transform: "translate3d(40px, 420px, 0) rotate(260deg)", opacity: "0" },
        },
        glow: { "0%, 100%": { opacity: "0.55" }, "50%": { opacity: "1" } },
        shimmer: { "0%": { backgroundPosition: "200% 50%" }, "100%": { backgroundPosition: "-200% 50%" } },
      },
      animation: {
        swing: "swing 5.5s ease-in-out infinite",
        sway: "sway 8s ease-in-out infinite",
        petal: "petal 12s linear infinite",
        glow: "glow 2.8s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
