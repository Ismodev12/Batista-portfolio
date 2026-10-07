import { useEffect, useRef, useState } from "react";
import { stats } from "../data/site.js";
import { Reveal } from "./ui.jsx";

/* Chiffre qui compte de 0 jusqu'à sa valeur quand il entre dans l'écran.
   "15+" → nombre 15, suffixe "+" (affiché en couleur d'accent). */
function Counter({ value }) {
  const [, digits, suffix] = value.match(/^(\d+)(.*)$/) || [null, "0", value];
  const target = Number(digits);
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now(), dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, (t - start) / dur);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(n).padStart(digits.length, "0")}<span className="text-accent">{suffix}</span>
    </span>
  );
}

/* Une seule grande barre arrondie contenant les quatre chiffres. */
export default function Stats() {
  return (
    <section className="shell pb-10 pt-6 sm:pt-10">
      <Reveal>
        <dl className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-bone/15 bg-bone/[0.05] sm:rounded-[2.5rem] lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`group relative flex flex-col-reverse items-center gap-2 px-4 py-9 text-center transition-colors duration-500 hover:bg-bone/[0.06] sm:py-12 ${i % 2 ? "border-l border-bone/10" : ""} ${i >= 2 ? "border-t border-bone/10 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <dt className="text-sm text-mist-dim transition-colors duration-500 group-hover:text-mist sm:text-base">{s.label}</dt>
              <dd className="font-display text-[clamp(2.5rem,4.6vw,4.75rem)] font-bold leading-none tracking-[-0.04em] transition-transform duration-500 group-hover:-translate-y-1">
                <Counter value={s.value} />
              </dd>
              <span aria-hidden="true" className="absolute inset-x-8 bottom-0 h-0.5 origin-center scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
