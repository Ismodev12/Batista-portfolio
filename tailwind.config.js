/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      // Palette : noir, blanc cassé et UNE couleur d'accent.
      // Pour changer la couleur du site, modifiez simplement "accent" ci-dessous.
      colors: {
        ink: "#090909", bone: "#F5F5EF", accent: "#9CFF3D",
        // Couleurs de texte secondaires, teintées vers le vert pour s'accorder à l'accent.
        mist: { DEFAULT: "#C9D1BC", dim: "#959E88" },   // sur fond noir : texte courant / discret
        moss: { DEFAULT: "#2B3421", dim: "#56604A" },   // sur fond clair : texte courant / discret
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
