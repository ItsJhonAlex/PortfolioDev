/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "animate-spin",
    "animate-pulse",
    "border-red-500",
    "border-green-500",
    "text-red-500",
    "text-green-500",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn tokens (drive Button + DropdownMenu) — mapped to café palette
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // café-specific tokens (hex via CSS vars, swap on .dark)
        cafe: {
          base: "var(--cafe-base)",
          elev: "var(--cafe-elev)",
          ink: "var(--cafe-ink)",
          mute: "var(--cafe-mute)",
          accent: "var(--cafe-accent)",
          sticky: "var(--cafe-sticky)",
          pin: "var(--cafe-pin)",
          border: "var(--cafe-border)",
          shadow: "var(--cafe-shadow)",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        hand: ["var(--font-caveat)", "Comic Sans MS", "cursive"],
      },
      boxShadow: {
        cafe: "2px 2px 0 var(--cafe-shadow)",
        "cafe-lg": "4px 4px 0 var(--cafe-shadow)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        "eq-bounce": {
          "0%, 100%": { height: "3px" },
          "50%": { height: "12px" },
        },
        "pin-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 var(--cafe-pin)" },
          "50%": { boxShadow: "0 0 0 4px rgba(217, 119, 87, 0)" },
        },
        "dot-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 4s linear infinite",
        "eq-1": "eq-bounce 0.8s ease-in-out infinite",
        "eq-2": "eq-bounce 0.8s ease-in-out 0.15s infinite",
        "eq-3": "eq-bounce 0.8s ease-in-out 0.3s infinite",
        "pin-pulse": "pin-pulse 3s ease-in-out infinite",
        "dot-pulse": "dot-pulse 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
