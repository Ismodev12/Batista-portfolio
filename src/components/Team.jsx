import { useEffect, useRef, useState } from "react";
import { team } from "../data/team.js";
import { Arrow, Reveal } from "./ui.jsx";

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const ease = "ease-[cubic-bezier(.65,0,.15,1)]";

/* Galerie en panneaux accordéon.
   - Un panneau est ouvert à la fois : fond vert, photo en couleur, nom en grand.
   - Les autres sont des bandes fines en noir et blanc, avec le nom écrit à la verticale.
   - Survol, clic ou clavier ouvrent un panneau ; sans interaction, la galerie
     passe toute seule d'une personne à l'autre. */
export default function Team() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [missing, setMissing] = useState({});
  const listRef = useRef(null);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(listRef.current);
    const t = setInterval(() => { if (visible) setActive((a) => (a + 1) % team.length); }, 3800);
    return () => { clearInterval(t); io.disconnect(); };
  }, [paused]);

  const open = (i) => { setActive(i); setPaused(true); };

  return (
    <section id="team" className="pb-24 sm:pb-36">
      <div className="shell grid items-end gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow text-accent">( Équipe — {String(team.length).padStart(2, "0")} talents )</p>
          <h2 className="mt-8 font-display text-title font-bold">Celles et ceux avec<br />qui je <span className="mark">travaille</span></h2>
        </Reveal>
        <Reveal delay={120} className="font-display text-xl leading-snug text-mist sm:text-2xl lg:col-span-4 lg:pb-3">
          Les meilleurs projets se construisent à plusieurs. Passez sur un visage pour faire connaissance.
        </Reveal>
      </div>

      <Reveal className="shell mt-14 sm:mt-20">
        <ul ref={listRef} onMouseLeave={() => setPaused(false)} className="flex flex-col gap-3 lg:h-[36rem] lg:flex-row">
          {team.map((m, i) => {
            const on = i === active;
            return (
              <li
                key={i}
                className={`relative overflow-hidden rounded-[1.75rem] ring-1 transition-[flex-grow,height,background-color,box-shadow] duration-700 ${ease}
                  ${on ? "h-[30rem] bg-accent ring-accent shadow-[0_40px_80px_-35px_rgb(var(--c-accent)/.7)] lg:grow-[5]" : "h-24 bg-bone/[0.05] ring-bone/10 hover:bg-bone/[0.09] lg:grow"}
                  sm:h-auto ${on ? "sm:h-[32rem]" : "sm:h-28"} lg:h-auto lg:basis-0`}
              >
                <button
                  type="button" aria-expanded={on} aria-label={`${m.name}, ${m.role}`}
                  onMouseEnter={() => open(i)} onFocus={() => open(i)} onClick={() => open(i)}
                  className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-none"
                />

                {/* Photo détourée : centrée quand le panneau est fermé, calée à droite quand il est ouvert */}
                <div
                  className={`pointer-events-none absolute bottom-0 top-0 w-[var(--pw)] transition-[left,filter] duration-700 [--pw:17rem] sm:[--pw:22rem] lg:[--pw:24rem] ${ease} ${on ? "grayscale-0" : "grayscale brightness-[.7]"}`}
                  style={{ left: on ? "calc(100% - min(100%, var(--pw)))" : "calc(50% - var(--pw) / 2)" }}
                >
                  {missing[i] ? (
                    <span className={`absolute inset-0 grid place-items-center font-display text-6xl font-bold ${on ? "text-ink/40" : "text-bone/25"}`}>{initials(m.name)}</span>
                  ) : (
                    <img
                      src={m.photo} alt="" loading="lazy" onError={() => setMissing((s) => ({ ...s, [i]: true }))}
                      className={`absolute inset-x-0 bottom-0 h-[94%] w-full origin-bottom object-contain object-bottom transition-transform duration-700 ${ease} ${on ? "scale-100 max-lg:h-[62%]" : "scale-[1.35] lg:scale-[1.15]"}`}
                    />
                  )}
                </div>

                {/* Bande fermée : numéro + nom */}
                <div className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-6 transition-opacity duration-300 lg:flex-col lg:items-start lg:justify-between lg:px-0 lg:py-6 ${on ? "opacity-0" : "opacity-100 delay-300"}`}>
                  <span className="font-display text-sm text-accent lg:mx-auto">0{i + 1}</span>
                  <span className="max-w-[60%] truncate text-right font-display text-lg font-bold lg:mx-auto lg:max-w-none lg:rotate-180 lg:text-xl lg:[writing-mode:vertical-rl]">{m.name}</span>
                </div>

                {/* Panneau ouvert : fiche */}
                <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 flex w-full flex-col justify-start gap-4 p-6 text-ink sm:p-9 lg:w-[55%] lg:justify-between lg:gap-0 ${on ? "" : "invisible"}`}>
                  <span className={`font-display text-sm font-medium transition-all duration-500 ${on ? "translate-y-0 opacity-100 delay-300" : "-translate-y-3 opacity-0"}`}>
                    0{i + 1} <span className="opacity-50">/ 0{team.length}</span>
                  </span>
                  <div>
                    <p className={`max-w-[11ch] font-display text-[clamp(2rem,4.2vw,3.75rem)] font-bold leading-[0.95] tracking-[-0.04em] transition-all duration-700 ${ease} ${on ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0"}`}>
                      {m.name}
                    </p>
                    <p className={`mt-5 inline-block max-w-[16rem] rounded-full bg-ink px-4 py-2 text-sm font-medium text-accent transition-all duration-700 ${ease} ${on ? "translate-y-0 opacity-100 delay-[400ms]" : "translate-y-6 opacity-0"}`}>
                      {m.role}
                    </p>
                    {m.link && (
                      <a href={m.link} target="_blank" rel="noreferrer" className="pointer-events-auto relative z-30 mt-6 flex w-fit items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.15em]">
                        Voir le profil <Arrow className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Pastilles de navigation */}
        <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
          {team.map((_, i) => (
            <button key={i} type="button" tabIndex={-1} onClick={() => open(i)}
              className={`h-2 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-accent" : "w-2 bg-bone/25 hover:bg-bone/50"}`} />
          ))}
        </div>
      </Reveal>

      {/* Bandeau d'invitation : avatars de l'équipe + place libre, texte, bouton */}
      <Reveal className="shell mt-12 sm:mt-16">
        <a href="#contact" className="group relative flex flex-col gap-8 overflow-hidden rounded-[2rem] bg-accent p-7 text-ink transition-transform duration-500 hover:-translate-y-1 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          {/* Motif de fond : grand texte en filigrane qui défile au survol */}
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-6 left-0 whitespace-nowrap font-display text-[7rem] font-bold leading-none tracking-[-0.05em] text-ink/[0.06] transition-transform duration-[1500ms] ease-out group-hover:-translate-x-24 sm:text-[10rem]">
            On recrute · On collabore · On construit ·
          </span>

          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* Avatars superposés + la place vide « vous » */}
            <div className="flex shrink-0 items-center">
              {team.map((m, i) => (
                <span key={i} className="-ml-3 grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-ink ring-4 ring-accent transition-transform duration-500 first:ml-0 group-hover:-translate-y-1 sm:h-16 sm:w-16" style={{ transitionDelay: `${i * 50}ms` }}>
                  <img src={m.photo} alt="" className="h-full w-full origin-[50%_8%] scale-[2.1] object-cover object-top grayscale" onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </span>
              ))}
              <span className="-ml-3 grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-ink bg-accent font-display text-2xl font-bold ring-4 ring-accent transition-all duration-500 group-hover:rotate-90 group-hover:bg-ink group-hover:text-accent sm:h-16 sm:w-16">+</span>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink/50" /><span className="relative inline-flex h-2 w-2 rounded-full bg-ink" /></span>
                Une place vous attend
              </p>
              <p className="mt-3 font-display text-[clamp(1.75rem,3.4vw,3rem)] font-bold leading-[1] tracking-[-0.04em]">Envie de rejoindre l’équipe ?</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/70 sm:text-base">Designer, développeur ou simplement passionné : parlons de ce qu’on pourrait construire ensemble.</p>
            </div>
          </div>

          <span className="relative flex w-fit shrink-0 items-center gap-3 rounded-full bg-ink py-3 pl-7 pr-3 font-display font-medium text-bone transition-colors duration-300 group-hover:bg-bone group-hover:text-ink">
            Discutons
            <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45"><Arrow /></span>
          </span>
        </a>
      </Reveal>
    </section>
  );
}
