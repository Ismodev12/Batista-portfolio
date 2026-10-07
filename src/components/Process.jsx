import { process } from "../data/site.js";
import { Arrow, Reveal } from "./ui.jsx";

// Décalage vertical en escalier sur grand écran.
const offset = ["", "lg:mt-10", "lg:mt-20", "lg:mt-[7.5rem]"];

/* Quatre cartes en escalier ; au survol, la carte se remplit de la couleur d'accent. */
export default function Process() {
  return (
    <section className="shell pb-24 sm:pb-32">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-accent">( Processus — 04 étapes )</p>
          <h2 className="mt-8 font-display text-title font-bold">Ma <span className="mark">méthode</span></h2>
        </Reveal>
        <Reveal delay={120} className="font-display text-xl leading-snug text-mist sm:text-2xl lg:col-span-5 lg:pb-3">
          De l’idée à la mise en ligne, quatre étapes simples pour avancer sans rien laisser au hasard.
        </Reveal>
      </div>

      <ol className="mt-14 grid gap-5 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((s, i) => (
          <Reveal as="li" key={s.n} delay={i * 110} className={offset[i]}>
            <div tabIndex={0} className="group relative flex h-full min-h-[19rem] flex-col justify-between overflow-hidden rounded-[2rem] border border-bone/15 bg-bone/[0.05] p-7 transition-[transform,color,border-color,box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-2 hover:border-accent hover:text-ink hover:shadow-[0_30px_60px_-25px_rgba(156,255,61,.6)] focus-visible:text-ink sm:p-8">
              <span aria-hidden="true" className="absolute inset-0 bg-accent transition-[clip-path] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [clip-path:circle(0%_at_0%_100%)] group-hover:[clip-path:circle(150%_at_0%_100%)] group-focus-visible:[clip-path:circle(150%_at_0%_100%)]" />
              {/* Grand numéro en contour */}
              <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-6 font-display text-[9rem] font-bold leading-none tracking-[-0.06em] text-transparent transition-all duration-700 [-webkit-text-stroke:1.5px_rgba(245,245,239,.16)] group-hover:-translate-x-2 group-hover:translate-y-2 group-hover:[-webkit-text-stroke:1.5px_rgba(9,9,9,.3)]">{s.n}</span>

              <div className="relative flex items-center justify-between">
                <span className="rounded-full border border-current px-4 py-1.5 font-display text-xs font-medium uppercase tracking-[0.18em]">Étape {s.n}</span>
              </div>

              <div className="relative mt-16">
                <h3 className="font-display text-4xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-1.5">{s.title}</h3>
                <p className="mt-3 text-lg text-mist transition-colors duration-500 group-hover:text-ink">{s.text}</p>
                <span className="mt-7 flex items-center gap-3">
                  <span className="h-px flex-1 bg-current opacity-25 transition-opacity duration-500 group-hover:opacity-60" />
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-current transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-accent">
                    <Arrow className="h-4 w-4" />
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
