import { coreSkills, skillGroups } from "../data/skills.js";
import { Arrow, Icon, Reveal, Spark } from "./ui.jsx";

export default function Skills() {
  return (
    <section id="skills" className="p-2 pt-16 sm:p-3 sm:pt-24">
      <div className="rounded-panel bg-bone py-20 text-ink sm:py-28">
        <div className="shell">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <p className="eyebrow">( Compétences )</p>
              <h2 className="mt-8 font-display text-title font-bold">Mes outils<br />du <span className="mark">quotidien.</span></h2>
            </Reveal>
            <Reveal delay={120} className="text-lg leading-relaxed text-moss lg:col-span-4">
              Trois technologies au cœur de mon travail, entourées d’un socle solide que je continue de renforcer projet après projet.
            </Reveal>
          </div>

          {/* Technologies dominantes */}
          <ul className="mt-14 border-b border-ink/15 sm:mt-16">
            {coreSkills.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 90}>
                <div tabIndex={0} className="group relative -mx-5 grid cursor-default grid-cols-12 items-center gap-x-4 gap-y-3 overflow-hidden border-t border-ink/15 px-5 py-8 transition-[color,padding] duration-500 hover:text-bone focus-visible:text-bone sm:-mx-8 sm:px-8 sm:py-9 lg:hover:px-12">
                  <span className="absolute inset-0 origin-bottom scale-y-0 rounded-[2rem] bg-ink transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100" />
                  <span className="relative col-span-2 font-display text-sm font-medium transition-colors group-hover:text-accent lg:col-span-1 sm:text-base">{s.n}</span>
                  <h3 className="relative col-span-10 font-display text-[clamp(1.9rem,5vw,4.75rem)] font-bold uppercase leading-none tracking-[-0.045em] lg:col-span-6">{s.name}</h3>
                  <div className="relative col-span-10 col-start-3 lg:col-span-4 lg:col-start-auto">
                    <p className="eyebrow transition-colors group-hover:text-accent">{s.role}</p>
                    <p className="mt-2 max-w-sm text-base text-moss-dim transition-colors duration-500 group-hover:text-mist lg:translate-y-2 lg:opacity-0 lg:transition-all lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100">{s.detail}</p>
                  </div>
                  <span className="relative col-span-1 hidden h-16 w-16 place-items-center justify-self-end rounded-full border border-current transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-accent group-hover:bg-accent group-hover:text-ink lg:grid">
                    <Icon src={s.icon} className="h-7 w-7" />
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Catégories */}
          <div className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={i * 100}>
                {/* Au survol : la boîte se remplit de vert depuis un coin, se soulève,
                    et ses pastilles se soulèvent l'une après l'autre. */}
                <div tabIndex={0} className={`group/box relative h-full overflow-hidden rounded-[2rem] p-8 transition-[transform,box-shadow,color,border-color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-2 hover:-rotate-1 hover:border-accent hover:text-ink hover:shadow-[0_30px_60px_-25px_rgba(156,255,61,.7)] focus-visible:-translate-y-2 focus-visible:text-ink sm:p-10 ${i === 0 ? "border border-ink bg-ink text-bone" : "border border-ink/15"}`}>
                  <span aria-hidden="true" className="absolute inset-0 bg-accent transition-[clip-path] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [clip-path:circle(0%_at_100%_0%)] group-hover/box:[clip-path:circle(150%_at_100%_0%)] group-focus-visible/box:[clip-path:circle(150%_at_100%_0%)]" />
                  <Spark className="absolute -bottom-10 -right-10 h-40 w-40 scale-50 text-ink opacity-0 transition-all duration-700 group-hover/box:scale-100 group-hover/box:opacity-10 group-hover/box:rotate-90" />
                  <div className="relative flex items-baseline justify-between">
                    <h3 className="font-display text-3xl font-bold tracking-tight transition-transform duration-500 group-hover/box:translate-x-1.5 sm:text-4xl">{g.title}</h3>
                    <span className={`font-display text-sm transition-colors duration-500 group-hover/box:text-ink ${i === 0 ? "text-accent" : ""}`}>{g.n} — {String(g.items.length).padStart(2, "0")}</span>
                  </div>
                  <span aria-hidden="true" className="relative mt-5 block h-0.5 w-10 bg-current opacity-30 transition-all duration-700 group-hover/box:w-full group-hover/box:opacity-100" />
                  <ul className="relative mt-8 flex flex-wrap gap-2.5">
                    {g.items.map((it, k) => (
                      <li key={it.name} style={{ transitionDelay: `${k * 45}ms` }} className="transition-transform duration-500 ease-[cubic-bezier(.2,1.3,.4,1)] group-hover/box:-translate-y-1">
                        <span className={`group/chip flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-300 hover:scale-105 hover:!border-ink hover:!bg-ink hover:!text-bone group-hover/box:border-ink/40 sm:text-base ${i === 0 ? "border-bone/20" : "border-ink/20"}`}>
                          <Icon src={it.icon} className="h-[1.1em] w-[1.1em] transition-transform duration-500 group-hover/chip:rotate-[20deg] group-hover/chip:scale-110" />
                          {it.name}
                          {it.note && <span className="text-xs opacity-60">· {it.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 flex items-center gap-3 text-sm text-moss-dim"><Arrow className="h-4 w-4 rotate-90" />Toujours en train d’apprendre — la liste s’allonge.</Reveal>
        </div>
      </div>
    </section>
  );
}
