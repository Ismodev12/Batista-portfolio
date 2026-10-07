import { useState } from "react";
import { team } from "../data/team.js";
import { Arrow, Reveal, Spark } from "./ui.jsx";

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
// Grille en quinconce : une colonne sur deux est décalée vers le bas (grand écran).
const drop = (i) => (i % 2 ? "lg:mt-12" : "");

// La tuile d'invitation occupe les colonnes restantes de la dernière ligne (grand écran).
const fill = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3", 4: "lg:col-span-4" };

function Member({ m, i }) {
  const [missing, setMissing] = useState(false);
  const Tag = m.link ? "a" : "div";
  const linkProps = m.link ? { href: m.link, target: "_blank", rel: "noreferrer" } : {};
  return (
    <Tag {...linkProps} className="theme-dark group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-ink text-bone ring-1 ring-bone/10 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-25px_rgb(var(--c-accent)/.55)]">
      {missing ? (
        <span className="absolute inset-0 flex items-start justify-center pt-[22%] sm:items-center sm:pt-0 bg-[repeating-linear-gradient(135deg,rgb(var(--c-bone)/.05)_0_2px,transparent_2px_16px)]">
          <span className="font-display text-[clamp(3rem,7vw,5.5rem)] font-bold tracking-[-0.04em] text-bone/25 transition-colors duration-500 group-hover:text-accent">{initials(m.name)}</span>
        </span>
      ) : (
        <img
          src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" onError={() => setMissing(true)}
          className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[900ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
        />
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-display text-xs text-bone backdrop-blur transition-colors duration-500 group-hover:bg-accent group-hover:text-ink">0{i + 1}</span>
      {m.link && (
        <span className="absolute right-4 top-4 grid h-9 w-9 scale-0 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:scale-100"><Arrow className="h-4 w-4" /></span>
      )}
      <span className="absolute inset-x-4 bottom-4 block sm:inset-x-5 sm:bottom-5">
        <span className="block font-display text-lg font-bold leading-tight tracking-tight sm:text-2xl">{m.name}</span>
        <span className="mt-1.5 block text-sm text-mist transition-colors duration-500 group-hover:text-accent sm:text-base">{m.role}</span>
        <span className="mt-3 block h-0.5 w-8 bg-accent transition-all duration-500 group-hover:w-full" />
      </span>
    </Tag>
  );
}

export default function Team() {
  return (
    <section id="team" className="shell pb-24 sm:pb-36">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow text-accent">( Équipe — {String(team.length).padStart(2, "0")} talents )</p>
          <h2 className="mt-8 font-display text-title font-bold">Celles et ceux avec<br />qui je <span className="mark">travaille</span></h2>
        </Reveal>
        <Reveal delay={120} className="font-display text-xl leading-snug text-mist sm:text-2xl lg:col-span-4 lg:pb-3">
          Les meilleurs projets se construisent à plusieurs. Voici les personnes avec qui je collabore.
        </Reveal>
      </div>

      <ul className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 sm:gap-5 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal as="li" key={i} delay={(i % 4) * 90} className={drop(i)}>
            <Member m={m} i={i} />
          </Reveal>
        ))}

        {/* Tuile d'invitation */}
        <Reveal as="li" delay={(team.length % 4) * 90} className={`${team.length % 2 ? "col-span-1" : "col-span-2"} ${fill[4 - (team.length % 4)]} ${drop(team.length)}`}>
          <a href="#contact" className="group relative flex h-full min-h-[14rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-accent p-5 text-ink transition-transform duration-500 hover:-translate-y-2 sm:p-9">
            <Spark className="absolute -right-8 -top-8 h-36 w-36 animate-spin-slow text-ink/10" />
            <span className="eyebrow relative">Et vous ?</span>
            <span className="relative flex items-end justify-between gap-4">
              <span className="font-display text-2xl font-bold leading-[1.05] tracking-tight sm:text-5xl">Rejoignez<br />l’aventure.</span>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 group-hover:rotate-45 max-sm:hidden"><Arrow /></span>
            </span>
          </a>
        </Reveal>
      </ul>
    </section>
  );
}
