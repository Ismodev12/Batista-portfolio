import { useEffect, useState } from "react";

/* Bouton flottant clair / sombre. Le choix est mémorisé sur l'appareil du visiteur.
   Les couleurs des deux thèmes sont définies en haut de src/index.css. */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#F5F5EF" : "#090909");
    try { localStorage.setItem("theme", theme); } catch { /* stockage indisponible : le choix vaut pour cette visite */ }
  }, [theme]);

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-anim");                       // fondu doux entre les deux thèmes
    setTimeout(() => root.classList.remove("theme-anim"), 700);
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  const light = theme === "light";
  return (
    <button
      type="button" onClick={toggle} aria-pressed={light}
      aria-label={light ? "Passer en mode sombre" : "Passer en mode clair"} title={light ? "Mode sombre" : "Mode clair"}
      className="theme-toggle group fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-bone/20 bg-ink text-bone shadow-[0_12px_30px_-8px_rgb(0_0_0/.45)] transition-transform duration-300 hover:scale-110 active:scale-95 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-accent transition-transform duration-500 group-hover:scale-100" />
      {/* Soleil */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"
        className={`absolute h-6 w-6 transition-all duration-500 group-hover:text-ink ${light ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100"}`}>
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      {/* Lune */}
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
        className={`absolute h-6 w-6 transition-all duration-500 group-hover:text-ink ${light ? "rotate-0 scale-100" : "-rotate-90 scale-0 opacity-0"}`}>
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
