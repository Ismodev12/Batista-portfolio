import { site } from "../data/site.js";
import { coreSkills } from "../data/skills.js";
import { Arrow, Icon, Reveal, Spark } from "./ui.jsx";

const Star = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" aria-hidden="true">
    <path d="m12 2 3.1 6.6 7.1.9-5.2 5 1.3 7.1L12 18.2l-6.3 3.4L7 14.5l-5.2-5 7.1-.9z" />
  </svg>
);

// Effet de profondeur : chaque calque se décale selon la position du curseur (--mx / --my, de -1 à 1).
const layer = "transition-transform duration-500 ease-out will-change-transform";
const depth = (px) => ({ transform: `translate3d(calc(var(--mx) * ${px}px), calc(var(--my) * ${px}px), 0)` });
const disc = "absolute left-1/2 top-[16%] aspect-square w-[92%] -ml-[46%] [container-type:inline-size]";
const tilt = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
  e.currentTarget.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
};
const reset = (e) => { e.currentTarget.style.setProperty("--mx", 0); e.currentTarget.style.setProperty("--my", 0); };

/* Disposition : titre centré sur deux lignes, portrait détouré centré et posé sur le bas
   du panneau, court texte + bouton à gauche, repère chiffré à droite, deux boutons
   à cheval sur le bas du portrait. */
export default function Hero() {
  return (
    <section id="top" className="p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-[1.75rem] rounded-b-[3.5rem] bg-bone text-ink sm:rounded-[2.5rem] sm:rounded-b-[9rem] lg:min-h-[calc(100svh-1.5rem)]">
        <div className="shell flex flex-col pt-32 sm:pt-[clamp(7.5rem,17svh,11rem)] lg:min-h-[calc(100svh-1.5rem)]">
          {/* Titre */}
          <div className="relative z-10 mx-auto w-fit max-w-full text-center lg:text-[clamp(2.1rem,min(5.2vw,9.6svh),5.75rem)]">
            <Reveal delay={150} className="absolute -left-4 -top-12 hidden h-16 w-16 sm:block lg:-left-[1.25em] lg:top-0 lg:h-[1em] lg:w-[1em]"><Spark className="h-full w-full animate-spin-slow text-accent" /></Reveal>
            <Reveal delay={1150} className="absolute -right-4 bottom-1 hidden h-10 w-14 sm:block lg:-right-16 lg:h-12 lg:w-16"><svg viewBox="0 0 60 40" className="h-full w-full text-accent" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
              <path d="M4 30 30 8M22 36 54 14M44 38l12-8" />
            </svg></Reveal>
            <h1 className="font-display text-[clamp(2.1rem,min(5.2vw,9.6svh),5.75rem)] font-bold leading-[1.12] tracking-[-0.03em]">
              <Reveal as="span" delay={450} className="block sm:inline-block">Transformer les idées</Reveal><br className="hidden sm:block" />{" "}
              <Reveal as="span" delay={800} className="block sm:inline-block">en expériences web</Reveal>
            </h1>
          </div>

          {/* Texte · portrait · repère */}
          <div className="grid flex-1 items-end gap-x-10 gap-y-12 pt-10 lg:grid-cols-[minmax(15rem,1fr)_auto_minmax(15rem,1fr)] lg:pt-[clamp(1.5rem,5svh,3.5rem)]">
            <Reveal delay={1900} className="relative z-10 text-center lg:self-center lg:pb-10 lg:text-left">
              <svg viewBox="0 0 40 30" className="mx-auto mb-6 h-7 w-9 text-accent lg:mx-0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" aria-hidden="true">
                <path d="M4 22 20 6M16 26 36 10" />
              </svg>
              <p className="mx-auto max-w-[21rem] text-base leading-[1.8] text-moss lg:mx-0 lg:text-lg">
                Du design à l’intégration, je conçois des interfaces modernes et des applications web
                performantes avec React.js, Tailwind CSS et Laravel. Créons quelque chose d’utile ensemble.
              </p>
              <a href="#about" className="btn mt-9 whitespace-nowrap border border-ink/40 !px-7 !py-3 !text-sm hover:border-ink hover:bg-ink hover:text-bone lg:!text-base">Découvrir mon profil</a>
            </Reveal>

            {/* Survol du portrait :
                1. profondeur — le cercle, le trait et la photo suivent le curseur à des vitesses
                   différentes, ce qui donne un effet de relief ;
                2. couleur — la photo, en noir et blanc au repos, retrouve ses vraies couleurs ;
                3. orbite — un anneau en pointillés apparaît et les trois technologies
                   principales se mettent à tourner autour de Batista. */}
            <Reveal
              delay={1300} onMouseMove={tilt} onMouseLeave={reset} style={{ "--mx": 0, "--my": 0 }}
              className="group/portrait relative order-last mx-auto w-full max-w-xl lg:order-none lg:w-fit lg:max-w-full"
            >
              <div className={`${disc} ${layer}`} style={depth(-16)}>
                <div className="h-full w-full rounded-full bg-ink/[0.13] transition-transform duration-700 group-hover/portrait:scale-[1.05]" />
              </div>
              <div className={`${disc} ${layer}`} style={depth(-8)} aria-hidden="true">
                <div className="h-full w-full scale-90 animate-spin-slow rounded-full border-2 border-dashed border-accent opacity-0 transition-[opacity,transform] duration-700 group-hover/portrait:scale-[1.14] group-hover/portrait:opacity-100" />
              </div>
              <svg viewBox="0 0 200 200" className={`absolute -left-[6%] top-[38%] w-[46%] text-ink ${layer}`} style={depth(-30)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <path d="M150 20C70 10 10 70 30 130s90 70 130 30-10-110-60-90-50 80 0 90" />
              </svg>
              {/* Portrait détouré (fond transparent), sans cadre */}
              <img
                src={site.images.hero} alt={`Portrait de ${site.name}, développeuse web`} width={960} height={1147}
                className={`relative mx-auto block h-auto w-full select-none grayscale contrast-[1.05] transition-[transform,filter] duration-700 ease-out will-change-transform group-hover/portrait:grayscale-0 lg:max-h-[80svh] lg:w-auto`} style={depth(10)} draggable="false"
              />
              {/* Technologies en orbite, devant le portrait */}
              <div className={`pointer-events-none ${disc} ${layer}`} style={depth(-8)} aria-hidden="true">
                <div className="h-full w-full scale-[1.14] animate-spin-slow">
                  {coreSkills.map((sk, i) => (
                    <span key={sk.name} className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: `rotate(${i * 120 + 35}deg) translateY(-50cqw)` }}>
                      <span className="absolute -left-6 -top-6 block h-12 w-12 animate-spin-slow [animation-direction:reverse]">
                        <span
                          className="grid h-12 w-12 scale-0 place-items-center rounded-full bg-ink text-accent shadow-xl ring-2 ring-accent transition-transform duration-500 ease-[cubic-bezier(.2,1.4,.4,1)] group-hover/portrait:scale-100"
                          style={{ transitionDelay: `${i * 90}ms`, rotate: `${-(i * 120 + 35)}deg` }}
                        >
                          <Icon src={sk.icon} className="h-5 w-5" />
                        </span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-8 left-1/2 w-max -translate-x-1/2">
              <Reveal delay={2500} className="flex flex-nowrap items-center gap-3 whitespace-nowrap sm:gap-5">
                <a href="#projects" className="btn group !gap-2 bg-accent !px-6 !py-3.5 !text-sm text-ink shadow-xl hover:bg-bone lg:!text-base">
                  Voir mes projets <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                </a>
                <a href="#contact" className="btn border border-bone/20 bg-ink !px-6 !py-3.5 !text-sm text-bone shadow-xl hover:bg-bone hover:text-ink lg:!text-base">Collaborons</a>
              </Reveal>
              </div>
            </Reveal>

            <Reveal delay={2150} className="relative z-10 flex flex-col items-center text-center lg:items-end lg:self-center lg:pb-10 lg:text-right">
              <div className="flex gap-1 text-accent [filter:drop-shadow(0_0_0_#090909)]" role="img" aria-label="Cinq étoiles">
                <Star /><Star /><Star /><Star /><Star />
              </div>
              <p className="mt-5 whitespace-nowrap font-display text-4xl font-bold leading-none tracking-tight xl:text-5xl">15+ Interfaces</p>
              <p className="mt-3 text-base text-moss-dim lg:text-lg">conçues</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
