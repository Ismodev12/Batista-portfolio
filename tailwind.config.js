/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Palette : noir, blanc cassé et UNE couleur d'accent.
      // Les valeurs sont définies en haut de src/index.css.
      colors: {
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        bone: "rgb(var(--c-bone) / <alpha-value>)",
        accent: "rgb(var(--c-accent) / <alpha-value>)",
        mist: { DEFAULT: "rgb(var(--c-mist) / <alpha-value>)", dim: "rgb(var(--c-mist-dim) / <alpha-value>)" },   // texte courant / discret sur fond « ink »
        moss: { DEFAULT: "rgb(var(--c-moss) / <alpha-value>)", dim: "rgb(var(--c-moss-dim) / <alpha-value>)" },   // texte courant / discret sur fond « bone »
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', "Space Grotesk", "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["clamp(2.25rem, 5vw, 5.25rem)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        mega: ["clamp(2.4rem, 6vw, 6.25rem)", { lineHeight: "0.92", letterSpacing: "-0.05em" }],
        title: ["clamp(2.1rem, 4.4vw, 4.5rem)", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
      },
      borderRadius: { panel: "clamp(1.5rem, 3vw, 2.75rem)" },
      keyframes: {
        marquee: { to: { transform: "translateX(-50%)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        spinSlow: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spinSlow 18s linear infinite",
      },
    },
  },
  plugins: [],
};
