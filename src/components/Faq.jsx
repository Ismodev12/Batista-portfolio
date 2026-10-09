import { useState } from "react";
import { faq } from "../data/clientContent.js";
import { site } from "../data/site.js";
import { Arrow, Reveal } from "./ui.jsx";

/* FAQ en forme de conversation : la question du client, la réponse de Batista en bulle. */
export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative pb-24 sm:pb-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-20 h-[30rem] w-[30rem] -translate-x-1/3 rounded-full bg-accent/[0.06] blur-[110px]" />
      <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <p className="eyebrow text-accent">( Questions fréquentes )</p>
          <h2 className="mt-8 font-display text-[clamp(2.4rem,4.6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.045em]">
            Ce qu’on me demande<br /><span className="mark">avant de signer.</span>
          </h2>
          <p className="mt-6 max-w-sm text-lg leading-relaxed text-mist">Des réponses franches aux questions que tout le monde se pose.</p>

          {/* Carte « une autre question » avec avatar */}
          <a href="#contact" className="group mt-10 flex items-center gap-4 rounded-[1.75rem] border border-bone/10 bg-bone/[0.04] p-4 pr-5 transition-colors duration-500 hover:border-accent/50 sm:max-w-md">
            <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-bone/10 ring-2 ring-accent">
              <img src={site.images.hero} alt="" className="h-full w-full scale-[2.2] object-cover object-top" style={{ transformOrigin: "50% 12%" }} />
              <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full bg-accent ring-2 ring-ink" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display font-bold">Une autre question ?</span>
              <span className="block truncate text-sm text-mist-dim">Je réponds personnellement · {site.email}</span>
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45"><Arrow className="h-4 w-4" /></span>
          </a>
        </Reveal>

        <ul className="space-y-3 lg:col-span-7">
          {faq.map((item, i) => {
            const on = open === i;
            return (
              <Reveal as="li" key={item.q} delay={i * 60}>
                <div className={`rounded-[1.75rem] border transition-all duration-500 ${on ? "border-bone/15 bg-bone/[0.05] p-2" : "border-transparent p-0"}`}>
                  <button
                    type="button" aria-expanded={on} aria-controls={`faq-${i}`} onClick={() => setOpen(on ? -1 : i)}
                    className={`group flex w-full items-center gap-4 rounded-[1.4rem] px-5 py-5 text-left transition-colors duration-500 sm:px-7 ${on ? "bg-accent text-ink" : "bg-bone/[0.04] hover:bg-bone/[0.08]"}`}
                  >
                    <span className={`font-display text-sm ${on ? "text-ink/60" : "text-accent"}`}>0{i + 1}</span>
                    <span className="flex-1 font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">{item.q}</span>
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ${on ? "rotate-45 bg-ink text-accent" : "bg-bone/10 group-hover:bg-accent group-hover:text-ink"}`}>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                    </span>
                  </button>
                  <div id={`faq-${i}`} role="region" className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <div className={`flex items-end gap-3 px-3 pb-3 pt-4 transition-all duration-500 sm:px-5 ${on ? "translate-y-0 opacity-100 delay-150" : "translate-y-3 opacity-0"}`}>
                        <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-bone/10 ring-1 ring-accent/60">
                          <img src={site.images.hero} alt="" className="h-full w-full scale-[2.2] object-cover object-top" style={{ transformOrigin: "50% 12%" }} />
                        </span>
                        <div className="rounded-[1.25rem] rounded-bl-md bg-ink px-5 py-4 ring-1 ring-bone/10">
                          <p className="font-display text-xs font-medium text-accent">{site.name.split(" ")[0]}</p>
                          <p className="mt-1.5 leading-relaxed text-mist">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
