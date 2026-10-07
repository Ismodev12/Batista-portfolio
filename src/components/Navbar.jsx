import { useEffect, useState } from "react";
import { navLinks, site } from "../data/site.js";
import { Arrow, Spark } from "./ui.jsx";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-5 sm:top-7 z-50 px-5 sm:px-10">
        {/* Liens répartis de part et d'autre du logo centré */}
        <nav className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center rounded-full border border-bone/10 bg-ink/90 px-3 py-2.5 text-bone backdrop-blur-xl md:grid-cols-[1fr_auto_1fr] md:px-12 md:py-5">
          <ul className="hidden items-center justify-around text-sm text-mist md:flex">
            {navLinks.slice(0, 2).map((l) => (
              <li key={l.href}><a href={l.href} className="link-line transition-colors hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
          <a href="#top" className="flex items-center gap-2.5 pl-3 font-display text-base font-bold tracking-tight md:px-10 md:text-xl" onClick={() => setOpen(false)}>
            <Spark className="h-5 w-5 text-accent md:h-6 md:w-6" />{site.name}
          </a>
          <ul className="hidden items-center justify-around text-sm text-mist md:flex">
            {navLinks.slice(2).map((l) => (
              <li key={l.href}><a href={l.href} className="link-line transition-colors hover:text-accent">{l.label}</a></li>
            ))}
          </ul>
          <button
            type="button" aria-label={open ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative grid h-11 w-11 place-items-center justify-self-end rounded-full bg-accent text-ink"
          >
            <span className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </nav>
      </header>

      {/* Menu mobile plein écran */}
      <div
        className={`md:hidden fixed inset-0 z-40 flex flex-col justify-between bg-ink px-6 pb-10 pt-32 transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${open ? "visible" : "invisible"}`}
        style={{ clipPath: open ? "circle(150% at calc(100% - 3rem) 3rem)" : "circle(0% at calc(100% - 3rem) 3rem)" }}
      >
        <ul className="space-y-1">
          {navLinks.map((l, i) => (
            <li key={l.href} className="border-b border-bone/10">
              <a
                href={l.href} onClick={() => setOpen(false)}
                className={`flex items-baseline justify-between py-4 font-display text-5xl font-bold tracking-tight transition-all duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: open ? `${200 + i * 70}ms` : "0ms" }}
              >
                {l.label}<span className="text-sm font-medium text-accent">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div>
          <a href="#contact" onClick={() => setOpen(false)} className="btn w-full bg-accent text-ink">Discutons <Arrow /></a>
          <p className="mt-5 text-center text-sm text-mist-dim">{site.email}</p>
        </div>
      </div>
    </>
  );
}
