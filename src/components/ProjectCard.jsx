import { useRef } from "react";
import { Arrow, Media, Reveal } from "./ui.jsx";

/* Image de projet avec ses animations de survol :
   - la photo passe du noir & blanc à la couleur et zoome doucement ;
   - une pastille « Voir » suit le curseur ;
   - un trait de couleur se déroule en bas de l'image. */
function Shot({ src, alt, className = "", position = "", children }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={move} className={`group/shot relative overflow-hidden ${className}`} style={{ "--x": "50%", "--y": "50%" }}>
      <Media
        src={src} alt={alt} className="!absolute inset-0"
        imgClassName={`transition-all duration-[1200ms] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.08] group-hover:grayscale-0 ${position}`}
      />
      {children}
      <span className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100" />
      {/* Pastille qui suit le curseur (écrans avec souris) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 hidden will-change-transform lg:block"
        style={{ transform: "translate(calc(var(--x) - 50%), calc(var(--y) - 50%))" }}
      >
        <span className="grid h-28 w-28 scale-0 place-items-center rounded-full bg-accent font-display text-sm font-bold uppercase tracking-[0.14em] text-ink shadow-2xl transition-transform duration-500 ease-[cubic-bezier(.2,1.3,.4,1)] group-hover/shot:scale-100">
          <span className="flex items-center gap-1.5">Voir <Arrow className="h-4 w-4" /></span>
        </span>
      </span>
    </div>
  );
}

/* Les pastilles de technologies se soulèvent l'une après l'autre au survol. */
function Stack({ items, className = "" }) {
  return (
    <ul className={`flex flex-wrap items-start gap-2 ${className}`}>
      {items.map((t, i) => (
        <li
          key={t} style={{ transitionDelay: `${i * 70}ms` }}
          className="rounded-full border border-current px-4 py-2 text-sm opacity-70 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:opacity-100"
        >{t}</li>
      ))}
    </ul>
  );
}

function View({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-4 font-display text-sm font-medium uppercase tracking-[0.2em] ${className}`}>
      <span className="link-line group-hover:after:origin-left group-hover:after:scale-x-100">Voir le projet</span>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"><Arrow /></span>
    </span>
  );
}

/* Le nom du projet glisse légèrement et laisse apparaître un trait d'accent. */
const Name = ({ children, className = "" }) => (
  <h3 className={`font-display font-bold uppercase leading-[0.9] tracking-[-0.05em] transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-x-3 ${className}`}>{children}</h3>
);

export default function ProjectCard({ project: p }) {
  const alt = `${p.name} — ${p.tagline}`;

  // 01 — image immense plein cadre, titre posé dessus
  if (p.layout === "full") return (
    <Reveal as="article">
      <a href={p.link} className="group block">
        <Shot src={p.image} alt={alt} className="aspect-[4/3] rounded-panel sm:aspect-[16/10] lg:aspect-[16/7]">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-700 group-hover:opacity-80" />
          <span className="absolute left-6 top-6 rounded-full bg-accent px-5 py-2 font-display text-sm font-medium text-ink transition-transform duration-500 group-hover:-translate-y-1 sm:left-10 sm:top-10">{p.n} — {p.type}</span>
          <div className="absolute inset-x-6 bottom-6 flex flex-wrap items-end justify-between gap-6 sm:inset-x-10 sm:bottom-10">
            <Name className="text-[clamp(2.5rem,7.5vw,7.5rem)]">{p.name}</Name>
            <View className="pb-2" />
          </div>
        </Shot>
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <p className="font-display text-xl leading-snug tracking-tight sm:text-2xl lg:col-span-7">{p.description}</p>
          <Stack items={p.stack} className="lg:col-span-5 lg:justify-end" />
        </div>
      </a>
    </Reveal>
  );

  // 02 / 03 — composition asymétrique, image haute
  if (p.layout === "right" || p.layout === "left") {
    const left = p.layout === "left";
    return (
      <Reveal as="article">
        <a href={p.link} className="group grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div className={`lg:col-span-7 ${left ? "" : "lg:order-2"}`}>
            <Shot
              src={p.image} alt={alt} position={p.position}
              className={`${p.aspect || "aspect-[4/3] sm:aspect-[3/2]"} rounded-panel transition-[border-radius] duration-700 ease-out ${left ? "rounded-tr-[12rem] group-hover:rounded-tr-panel" : "rounded-tl-[12rem] group-hover:rounded-tl-panel"}`}
            />
          </div>
          <div className={`lg:col-span-5 lg:pb-10 ${left ? "" : "lg:order-1"}`}>
            <p className="font-display text-[clamp(3rem,6.5vw,6rem)] font-bold leading-none tracking-[-0.06em] text-bone/15 transition-all duration-700 group-hover:-translate-y-2 group-hover:text-accent">{p.n}</p>
            <Name className="mt-4 text-[clamp(2.5rem,5vw,5rem)]">{p.name}</Name>
            <p className="eyebrow mt-6 text-accent">{p.type}</p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mist sm:text-xl">{p.description}</p>
            <Stack items={p.stack} className="mt-8" />
            <View className="mt-12" />
          </div>
        </a>
      </Reveal>
    );
  }

  // 04 — grand panneau clair
  return (
    <Reveal as="article">
      <a href={p.link} className="group block rounded-panel bg-bone p-3 text-ink transition-transform duration-700 ease-out hover:-translate-y-2 sm:p-4">
        <div className="grid gap-8 px-4 pb-8 pt-8 sm:px-8 sm:pt-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">{p.n} — {p.type}</p>
            <Name className="mt-5 text-[clamp(2.75rem,8vw,8rem)]">{p.name}</Name>
          </div>
          <div className="lg:col-span-4 lg:pb-4">
            <p className="text-lg leading-relaxed text-moss">{p.description}</p>
            <Stack items={p.stack} className="mt-6" />
          </div>
        </div>
        <Shot src={p.image} alt={alt} className="aspect-[4/3] rounded-[calc(theme(borderRadius.panel)-0.75rem)] bg-ink sm:aspect-[16/9] lg:aspect-[16/7]">
          <View className="absolute bottom-5 right-5 rounded-full bg-ink py-2 pl-7 pr-2 text-bone sm:bottom-8 sm:right-8" />
        </Shot>
      </a>
    </Reveal>
  );
}
