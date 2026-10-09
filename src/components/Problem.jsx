import { problems } from "../data/clientContent.js";
import { Reveal } from "./ui.jsx";

/* Illustrations « avant → après » : état cassé au repos, réparé au survol (ou au toucher). */
function Visual({ kind }) {
  if (kind === "speed") return (
    <div className="w-full">
      <div className="flex items-center justify-between font-display text-sm">
        <span className="text-ink/70 group-hover:hidden">Chargement…</span>
        <span className="hidden text-ink group-hover:inline">Chargé</span>
        <span className="tabular-nums text-ink/70 group-hover:hidden">4,8 s</span>
        <span className="hidden tabular-nums font-bold text-ink group-hover:inline">0,9 s</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full w-[68%] animate-[stall_3.2s_ease-in-out_infinite] rounded-full bg-ink/35 group-hover:w-full group-hover:animate-none group-hover:bg-ink" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-14 rounded-xl bg-ink/[0.07] transition-all duration-500 group-hover:bg-ink group-hover:shadow-lg" style={{ transitionDelay: `${i * 90}ms` }} />
        ))}
      </div>
    </div>
  );
  if (kind === "search") return (
    <div className="relative w-full space-y-2.5">
      <div className="flex h-9 items-center gap-2 rounded-full bg-ink/[0.07] px-4 text-xs text-ink/70">
        <span className="h-3 w-3 rounded-full border-2 border-ink/40" /> votre métier + votre ville
      </div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3 px-1 transition-transform duration-500 group-hover:translate-y-[2.6rem]">
          <span className="h-2 w-2 rounded-full bg-ink/20" />
          <span className="h-2 rounded-full bg-ink/15" style={{ width: `${72 - i * 14}%` }} />
        </div>
      ))}
      <div className="flex items-center justify-between rounded-xl border border-dashed border-ink/25 px-3 py-2 text-xs text-ink/60 transition-all duration-500 group-hover:-translate-y-[3.4rem] group-hover:border-solid group-hover:border-ink group-hover:bg-ink group-hover:text-accent">
        <span className="font-medium">votre-site.com</span>
        <span className="font-display"><span className="group-hover:hidden">page 2</span><span className="hidden group-hover:inline">n° 1</span></span>
      </div>
    </div>
  );
  return (
    <div className="flex w-full items-end justify-center gap-8">
      <div className="relative h-36 w-20 rounded-[1.1rem] border-[3px] border-ink/35 p-2 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-ink">
        <span className="mx-auto mb-2 block h-1 w-6 rounded-full bg-ink/25" />
        <div className="space-y-1.5">
          {[90, 60, 80, 45].map((w, i) => (
            <span key={i} className="block h-[3px] rounded bg-ink/25 transition-all duration-500 group-hover:h-2 group-hover:bg-ink/70" style={{ width: `${w}%`, transitionDelay: `${i * 60}ms` }} />
          ))}
        </div>
        <span className="absolute inset-x-2 bottom-2 grid h-3 place-items-center rounded-md bg-ink/10 text-[0.5rem] font-bold text-transparent transition-all duration-500 group-hover:h-6 group-hover:bg-ink group-hover:text-accent">Appeler</span>
      </div>
      <p className="max-w-[9rem] pb-3 font-display text-sm leading-snug text-ink/65 transition-colors duration-500 group-hover:text-ink">
        <span className="group-hover:hidden">Texte illisible, bouton introuvable</span>
        <span className="hidden group-hover:inline">Lisible, et un appel en un geste</span>
      </p>
    </div>
  );
}

/* Section « Le vrai sujet » : panneau sombre, trois grandes lignes problème → solution.
   Textes en blanc cassé sur fond sombre pour une lecture confortable ; les illustrations
   sont posées sur des cartes claires. */
export default function Problem() {
  return (
    <section id="probleme" className="p-2 sm:p-3">
      <style>{`@keyframes stall{0%{width:8%}55%{width:68%}100%{width:70%}}`}</style>
      <div className="relative overflow-hidden rounded-panel border border-accent/20 bg-[#0d110a] py-20 text-bone sm:py-28">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/[0.12] blur-[130px]" />
        <div className="shell relative">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow text-accent">( Le vrai sujet )</p>
              <h2 className="mt-8 font-display text-mega font-bold">Beau, mais<br />il ne vous <span className="mark">rapporte rien</span> ?</h2>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-4 lg:pb-3">
              <p className="text-lg leading-relaxed text-bone/85">
                Ce n’est presque jamais une question de goût. Trois problèmes font fuir vos visiteurs avant même qu’ils aient vu ce que vous faites.
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 font-display text-sm font-medium text-accent">
                <span aria-hidden="true">↻</span> Survolez ou touchez une ligne pour la réparer
              </p>
            </Reveal>
          </div>

          <ol className="mt-14 border-t border-bone/15 sm:mt-20">
            {problems.map((p, i) => (
              <Reveal as="li" key={p.tag} delay={i * 80}>
                <article tabIndex={0} className="group relative -mx-5 grid gap-8 overflow-hidden border-b border-bone/15 px-5 py-10 outline-none sm:-mx-8 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-14">
                  <span aria-hidden="true" className="absolute inset-0 origin-bottom scale-y-0 rounded-[2rem] bg-bone/[0.06] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />

                  {/* Numéro + étiquette */}
                  <div className="relative flex items-center gap-5 lg:col-span-3 lg:flex-col lg:items-start">
                    <span className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-none tracking-[-0.06em] text-bone/30 transition-colors duration-500 group-hover:text-accent">0{i + 1}</span>
                    <span className="relative inline-flex h-8 items-center overflow-hidden rounded-full bg-bone px-4 font-display text-xs font-bold uppercase tracking-[0.16em] text-ink">
                      <span className="transition-transform duration-500 group-hover:-translate-y-8">{p.tag}</span>
                      <span className="absolute inset-0 grid translate-y-8 place-items-center bg-accent text-ink transition-transform duration-500 group-hover:translate-y-0">Réglé ✓</span>
                    </span>
                  </div>

                  {/* Problème → solution */}
                  <div className="relative lg:col-span-5">
                    <h3 className="font-display text-[clamp(1.75rem,2.8vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.035em] text-bone">{p.title}</h3>
                    <p className="mt-4 max-w-lg text-lg leading-relaxed text-bone/80">{p.text}</p>
                    <p className="mt-6 flex max-w-lg items-start gap-3 rounded-2xl border border-bone/15 bg-bone/[0.05] p-4 leading-relaxed text-bone transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-accent">✓</span>
                      <span><span className="font-display font-bold">Ma solution — </span>{p.fix}</span>
                    </p>
                  </div>

                  {/* Illustration sur carte claire */}
                  <div className="relative lg:col-span-4">
                    <div className="flex h-56 items-center rounded-[1.75rem] bg-bone p-7 text-ink transition-all duration-500 group-hover:-rotate-1 group-hover:shadow-[0_30px_60px_-25px_rgb(var(--c-accent)/.5)]">
                      <Visual kind={p.visual} />
                    </div>
                    <span className="absolute -top-3 right-5 rounded-full bg-ink px-3 py-1 font-display text-[0.65rem] font-bold uppercase tracking-[0.16em] text-bone ring-1 ring-bone/20 transition-colors duration-500 group-hover:bg-accent group-hover:text-ink group-hover:ring-accent">
                      <span className="group-hover:hidden">Avant</span><span className="hidden group-hover:inline">Après</span>
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
