import { useEffect, useRef, useState } from "react";
import { offer } from "../data/clientContent.js";
import { site } from "../data/site.js";
import { Arrow, Reveal, Spark } from "./ui.jsx";

// Exemple de retour d'audit (illustratif) affiché à droite.
const sample = [
  { label: "Vitesse d’affichage", note: "Images trop lourdes", state: "warn" },
  { label: "Lisibilité sur mobile", note: "Bon", state: "ok" },
  { label: "Visibilité sur Google", note: "Titres de pages manquants", state: "warn" },
  { label: "Contact en un clic", note: "Bouton d’appel absent", state: "bad" },
];
const badge = { ok: "bg-accent text-ink", warn: "bg-bone/15 text-bone", bad: "bg-ink/80 text-bone" };
const mark = { ok: "✓", warn: "!", bad: "✕" };

/* Appel final : audit gratuit. Gauche : promesse + champ. Droite : aperçu animé d'un retour d'audit. */
export default function Offer() {
  const [value, setValue] = useState("");
  const [step, setStep] = useState(0);
  const ref = useRef(null);

  // Les lignes de l'aperçu « s'analysent » une à une quand le bloc entre à l'écran.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      sample.forEach((_, i) => setTimeout(() => setStep(i + 1), 500 + i * 650));
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const body = `Bonjour ${site.name.split(" ")[0]},\n\nPourriez-vous regarder ceci et me dire ce que vous corrigeriez en priorité ?\n\n${value}\n\nMerci !`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Demande d’audit gratuit")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="audit" className="shell pb-24 sm:pb-32">
      <Reveal>
        <div ref={ref} className="relative grid overflow-hidden rounded-[2.25rem] border border-accent/25 bg-[#0d110a] lg:grid-cols-12">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(var(--c-accent)/.16)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_30%_40%,black_15%,transparent_70%)]" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-20 -top-24 h-96 w-96 rounded-full bg-accent/25 blur-[120px]" />

          {/* Promesse + formulaire */}
          <div className="relative px-6 py-14 sm:px-12 sm:py-20 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-display text-xs font-medium uppercase tracking-[0.2em] text-accent">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-accent" /></span>
              {offer.eyebrow}
            </span>
            <h2 className="mt-8 font-display text-[clamp(2.2rem,4.6vw,4.25rem)] font-bold leading-[0.98] tracking-[-0.045em]">
              {offer.title.split("\n")[0]}<br /><span className="text-accent">{offer.title.split("\n")[1]}</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mist">{offer.text}</p>

            <form onSubmit={submit} className="mt-10 flex max-w-xl flex-col gap-2 rounded-[1.75rem] border border-bone/15 bg-ink/80 p-2 backdrop-blur transition-colors focus-within:border-accent sm:flex-row sm:rounded-full">
              <label htmlFor="audit-site" className="sr-only">Adresse de votre site ou votre activité</label>
              <input
                id="audit-site" required value={value} onChange={(e) => setValue(e.target.value)}
                placeholder="votre-site.com ou votre activité"
                className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-3.5 text-bone outline-none placeholder:text-mist-dim focus-visible:outline-none"
              />
              <button type="submit" className="group flex items-center justify-center gap-2 rounded-full bg-accent py-3 pl-6 pr-3 font-display font-medium text-ink transition-colors hover:bg-bone">
                Demander mon audit
                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 group-hover:rotate-45"><Arrow className="h-4 w-4" /></span>
              </button>
            </form>

            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-mist">
              {offer.perks.map((p) => (
                <li key={p} className="flex items-center gap-2"><span className="grid h-4 w-4 place-items-center rounded-full bg-accent text-[0.55rem] font-bold text-ink">✓</span>{p}</li>
              ))}
            </ul>
          </div>

          {/* Aperçu d'un retour d'audit */}
          <div className="relative border-t border-bone/10 px-6 py-12 sm:px-12 lg:col-span-5 lg:border-l lg:border-t-0 lg:py-20">
            <Spark className="absolute -right-8 -top-8 h-28 w-28 animate-spin-slow text-accent/15" />
            <div className="relative rotate-1 rounded-[1.75rem] bg-bone p-6 text-ink shadow-[0_40px_80px_-30px_rgb(var(--c-accent)/.45)] transition-transform duration-700 hover:rotate-0 sm:p-7">
              <div className="flex items-center justify-between">
                <p className="font-display text-xs font-medium uppercase tracking-[0.18em] text-ink/50">Exemple de retour</p>
                <span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-ink/15" />)}</span>
              </div>
              <p className="mt-3 font-display text-xl font-bold tracking-tight">votre-site.com</p>
              <ul className="mt-6 space-y-3">
                {sample.map((s, i) => {
                  const done = step > i;
                  return (
                    <li key={s.label} className={`flex items-center gap-3 rounded-2xl border p-3 transition-all duration-500 ${done ? "border-ink/10 bg-white" : "border-transparent bg-ink/[0.04]"}`}>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold transition-all duration-500 ${done ? badge[s.state] + " scale-100" : "scale-90 bg-ink/10 text-transparent"} ${done && s.state === "warn" ? "!bg-ink !text-accent" : ""}`}>
                        {done ? mark[s.state] : <span className="h-3 w-3 animate-spin rounded-full border-2 border-ink/30 border-t-transparent" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium">{s.label}</span>
                        <span className={`block text-xs transition-opacity duration-500 ${done ? "text-ink/60 opacity-100" : "opacity-0"}`}>{s.note}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className={`mt-5 rounded-2xl bg-ink px-4 py-3 text-sm text-bone transition-all duration-700 ${step >= sample.length ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
                <span className="font-display font-bold text-accent">3 priorités</span> identifiées, expliquées simplement.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
