import { useState } from "react";
import { benefits, comparison } from "../data/benefits.js";
import { Arrow, Icon, Reveal, Spark } from "./ui.jsx";

// Grille « bento » : la 1re carte est grande, les autres s'agencent autour (grand écran).
const bento = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
];

function Benefit({ b, i }) {
  const hero = i === 0;
  return (
    <div
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 transition-all duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 sm:p-8
        ${hero ? "min-h-[22rem] bg-accent text-ink lg:min-h-full" : "min-h-[15rem] border border-bone/10 bg-bone/[0.04] hover:border-accent/40 hover:bg-bone/[0.07]"}`}
    >
      {/* Grand numéro en filigrane */}
      <span aria-hidden="true" className={`pointer-events-none absolute -bottom-6 -right-2 font-display font-bold leading-none tracking-[-0.06em] transition-transform duration-700 group-hover:-translate-y-2 ${hero ? "text-[13rem] text-ink/10" : "text-[8rem] text-bone/[0.04] group-hover:text-accent/10"}`}>
        0{i + 1}
      </span>
      {hero && <Spark className="absolute -right-10 -top-10 h-40 w-40 animate-spin-slow text-ink/10" />}

      <span className={`relative grid h-14 w-14 place-items-center rounded-2xl transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 ${hero ? "bg-ink text-accent" : "bg-accent/10 text-accent ring-1 ring-accent/25 group-hover:bg-accent group-hover:text-ink"}`}>
        <Icon src={b.icon} className="h-6 w-6" />
      </span>

      <div className="relative mt-10">
        <h3 className={`font-display font-bold leading-[1.05] tracking-[-0.03em] ${hero ? "max-w-[14ch] text-[clamp(2rem,3.4vw,3.25rem)]" : "text-xl sm:text-2xl"}`}>{b.title}</h3>
        <p className={`mt-4 max-w-md leading-relaxed ${hero ? "text-lg text-ink/75" : "text-mist-dim transition-colors duration-500 group-hover:text-mist"}`}>{b.text}</p>
      </div>
    </div>
  );
}

/* Comparateur : un interrupteur bascule entre « ailleurs » et « avec moi ». */
function Compare() {
  const [mine, setMine] = useState(true);
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-bone p-6 text-ink sm:p-10">
      <div role="tablist" aria-label="Comparer" className="relative grid w-full max-w-md grid-cols-2 rounded-full bg-ink/[0.07] p-1.5 font-display text-sm font-medium sm:text-base">
        <span aria-hidden="true" className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full transition-all duration-500 ease-[cubic-bezier(.65,0,.15,1)] ${mine ? "translate-x-full bg-ink" : "translate-x-0 bg-ink/20"}`} />
        <button role="tab" aria-selected={!mine} onClick={() => setMine(false)} className={`relative z-10 rounded-full py-3 transition-colors duration-300 ${mine ? "text-ink/50 hover:text-ink" : "text-ink"}`}>Ailleurs, souvent</button>
        <button role="tab" aria-selected={mine} onClick={() => setMine(true)} className={`relative z-10 flex items-center justify-center gap-2 rounded-full py-3 transition-colors duration-300 ${mine ? "text-accent" : "text-ink/50 hover:text-ink"}`}>
          Avec moi <span className={`h-2 w-2 rounded-full bg-accent transition-opacity ${mine ? "opacity-100" : "opacity-0"}`} />
        </button>
      </div>

      <ul className="mt-8 divide-y divide-ink/10">
        {comparison.map(([before, after], i) => (
          <li key={i} className="flex items-start gap-4 py-5 sm:items-center sm:gap-6">
            <span className="mt-0.5 font-display text-sm text-ink/35 sm:mt-0">0{i + 1}</span>
            <span
              aria-hidden="true"
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-all duration-500 ${mine ? "rotate-0 bg-ink text-accent" : "rotate-90 bg-ink/10 text-ink/40"}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {mine ? "✓" : "✕"}
            </span>
            <span className="relative grid flex-1 overflow-hidden">
              <span
                className={`col-start-1 row-start-1 font-display text-lg font-bold leading-snug tracking-tight transition-all duration-500 sm:text-xl ${mine ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >{after}</span>
              <span
                className={`col-start-1 row-start-1 text-lg leading-snug text-ink/45 line-through decoration-ink/25 transition-all duration-500 sm:text-xl ${mine ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >{before}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WhyMe() {
  return (
    <section id="pourquoi" className="relative py-24 sm:py-32">
      {/* Halo vert discret en arrière-plan */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-40 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-accent/[0.07] blur-[120px]" />

      <div className="shell relative">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow text-accent">( Pour vous )</p>
            <h2 className="mt-8 font-display text-title font-bold">Ce que vous y <span className="mark">gagnez</span>.</h2>
          </Reveal>
          <Reveal delay={120} className="font-display text-xl leading-snug text-mist sm:text-2xl lg:col-span-4 lg:pb-3">
            Un site n’est pas une fin en soi : c’est un outil pour faire grandir votre activité.
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[repeat(3,minmax(15rem,auto))]">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={(i % 3) * 90} className={bento[i] || ""}>
              <Benefit b={b} i={i} />
            </Reveal>
          ))}
        </ul>

        <div className="mt-24 grid items-center gap-10 sm:mt-32 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-accent">( Pourquoi moi )</p>
            <h3 className="mt-6 font-display text-[clamp(2.4rem,4.6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
              La différence,<br /><span className="text-accent">concrètement.</span>
            </h3>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-mist">
              Basculez l’interrupteur pour comparer ce que vous évitez et ce que vous obtenez.
            </p>
            <a href="#contact" className="btn group mt-9 !gap-3 bg-accent !py-3 !pl-6 !pr-3 text-ink hover:bg-bone">
              Parlons de votre projet
              <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 group-hover:rotate-45"><Arrow className="h-4 w-4" /></span>
            </a>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <Compare />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
