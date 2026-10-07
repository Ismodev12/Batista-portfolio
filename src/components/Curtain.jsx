import { useEffect, useState } from "react";
import { site } from "../data/site.js";
import { Spark } from "./ui.jsx";

/* Rideau de cinéma affiché au chargement.
   Tant qu'il est fermé, <html data-stage="closed"> garde la Hero « en coulisses ».
   Au clic : les deux pans s'écartent, puis les éléments de la Hero se placent un à un
   (l'ordre est donné par la prop `delay` des <Reveal> dans Hero.jsx). */
const folds =
  "bg-[repeating-linear-gradient(90deg,#2c5208_0,#6cc21e_2.2%,#9cff3d_4.4%,#5fae18_6.6%,#2c5208_8.8%)]";
const shade = "absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-ink/70";

export default function Curtain() {
  const [phase, setPhase] = useState("closed"); // closed → opening → gone

  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { delete root.dataset.stage; setPhase("gone"); return; }
    root.dataset.stage = "closed";
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const open = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => { delete document.documentElement.dataset.stage; }, 650);   // la scène commence
    setTimeout(() => { document.body.style.overflow = ""; setPhase("gone"); }, 2100);
    // Une fois la scène jouée, les éléments de la Hero encore hors écran n'attendent plus leur tour.
    setTimeout(() => { document.documentElement.dataset.stage = "played"; }, 4200);
  };

  if (phase === "gone") return null;
  const opening = phase === "opening";
  const pan = "absolute top-0 h-full w-[51%] transition-transform duration-[1900ms] ease-[cubic-bezier(.75,0,.2,1)] will-change-transform";

  return (
    <button
      type="button" onClick={open} autoFocus aria-label="Lever le rideau et entrer sur le site"
      className={`theme-dark fixed inset-0 z-[100] block w-full cursor-pointer overflow-hidden text-bone ${opening ? "pointer-events-none" : ""}`}
    >
      {/* Les deux pans du rideau */}
      <span className={`${pan} left-0 origin-top-left ${folds} ${opening ? "-translate-x-[104%] skew-x-6" : ""}`}><span className={shade} /></span>
      <span className={`${pan} right-0 origin-top-right ${folds} ${opening ? "translate-x-[104%] -skew-x-6" : ""}`}><span className={shade} /></span>
      <span className={`absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-ink/45 blur-xl transition-opacity duration-500 ${opening ? "opacity-0" : ""}`} />

      {/* Lambrequin (bandeau du haut) */}
      <span className={`absolute inset-x-0 top-0 h-16 bg-ink shadow-[0_18px_40px_rgba(9,9,9,.6)] transition-transform duration-[1200ms] ease-[cubic-bezier(.75,0,.2,1)] sm:h-20 ${opening ? "-translate-y-[160%]" : ""}`}>
        <span className="absolute inset-x-0 top-full h-6 bg-[radial-gradient(circle_at_50%_0,#090909_0_70%,transparent_72%)] bg-[length:3.5rem_1.5rem] bg-repeat-x" />
        <span className="absolute inset-x-0 bottom-2 h-px bg-accent/60" />
      </span>

      {/* Projecteur + invitation */}
      <span className={`absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_50%_45%,transparent_0,transparent_22%,rgba(9,9,9,.72)_70%)] transition-opacity duration-500 ${opening ? "opacity-0" : ""}`}>
        <span className={`flex flex-col items-center px-6 text-center transition-transform duration-500 ${opening ? "scale-90" : ""}`}>
          <Spark className="h-14 w-14 animate-spin-slow text-bone sm:h-20 sm:w-20" />
          <span className="eyebrow mt-8 text-bone/80">Portfolio — 2026</span>
          <span className="mt-4 font-display text-[clamp(2.75rem,9vw,8rem)] font-bold leading-none tracking-[-0.04em] [text-shadow:0_6px_30px_rgba(9,9,9,.55)]">{site.name}</span>
          <span className="mt-10 flex items-center gap-3 rounded-full bg-ink px-7 py-4 font-display text-sm font-medium uppercase tracking-[0.2em] shadow-2xl sm:text-base">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            Cliquez pour lever le rideau
          </span>
        </span>
      </span>
    </button>
  );
}
