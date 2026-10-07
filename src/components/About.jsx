import { aboutFacts, site } from "../data/site.js";
import { Icon, Media, Reveal, Spark } from "./ui.jsx";

export default function About() {
  return (
    <section id="about" className="shell py-24 sm:py-32">
      <Reveal className="eyebrow text-accent">( À propos )</Reveal>
      <Reveal as="h2" delay={80} className="mt-8 font-display text-mega font-bold">
        Curieuse.<br />
        <span className="lg:pl-[12%]">Créative.</span><br />
        <span className="text-accent">En constante<br className="sm:hidden" /> évolution.</span>
      </Reveal>

      <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
        <Reveal className="group relative lg:col-span-4">
          <Media src={site.images.about} alt={`${site.name} au travail`} className="aspect-[4/5] rounded-panel" imgClassName="transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
          <div className="absolute -bottom-8 -right-3 grid h-28 w-28 place-items-center rounded-full bg-accent text-ink sm:-right-8 sm:h-36 sm:w-36">
            <Spark className="h-14 w-14 animate-spin-slow sm:h-20 sm:w-20" />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-6 lg:pt-10">
          <Reveal className="font-display text-2xl leading-snug tracking-tight sm:text-3xl sm:leading-[1.25]">
            Je suis Batista Segla, développeuse web junior passionnée par la création d’expériences numériques modernes.{" "}
            <span className="text-mist-dim">J’aime apprendre, expérimenter et transformer des problèmes complexes en interfaces simples et intuitives.</span>
          </Reveal>
          {/* Quatre cartes : icône, numéro, libellé, valeur. Au survol, la carte se remplit d'orange. */}
          <dl className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutFacts.map((f, i) => (
              <Reveal key={f.label} delay={i * 90}>
                <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-bone/15 bg-bone/[0.05] p-6 transition-[transform,color,border-color,box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-1.5 hover:border-accent hover:text-ink hover:shadow-[0_24px_50px_-22px_rgba(255,107,44,.65)] sm:p-7">
                  <span aria-hidden="true" className="absolute inset-0 bg-accent transition-[clip-path] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] [clip-path:circle(0%_at_0%_0%)] group-hover:[clip-path:circle(150%_at_0%_0%)]" />
                  <div className="relative flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-ink transition-all duration-500 group-hover:rotate-[-12deg] group-hover:bg-ink group-hover:text-accent">
                      <Icon src={f.icon} className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm text-mist-dim transition-colors duration-500 group-hover:text-ink">0{i + 1}</span>
                  </div>
                  <dt className="eyebrow relative mt-8 text-accent transition-colors duration-500 group-hover:text-ink">{f.label}</dt>
                  <dd className="relative mt-3 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">
                    {f.tags ? (
                      <span className="flex flex-wrap gap-2">
                        {f.tags.map((t) => (
                          <span key={t} className="rounded-full border border-current px-3.5 py-1 text-base sm:text-lg">{t}</span>
                        ))}
                      </span>
                    ) : f.value}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
