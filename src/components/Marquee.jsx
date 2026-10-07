import { Spark } from "./ui.jsx";

// Contenu de la bande — modifiez librement.
const items = ["React.js", "Tailwind CSS", "Laravel", "JavaScript", "PHP", "MySQL", "REST API", "Git", "Figma"];

/* Bande défilante unique, légèrement inclinée, juste après la Hero. */
export default function Marquee() {
  const row = (hidden) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {[...items, ...items].map((w, i) => (
        <span key={i} className="flex items-center font-display text-xl font-bold uppercase tracking-[0.05em] sm:text-[2.15rem]">
          <span className="px-7 sm:px-12">{w}</span><Spark className="h-6 w-6 sm:h-8 sm:w-8" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden py-10 sm:py-14">
      <div className="-mx-6 -rotate-2 bg-accent py-5 text-ink shadow-[0_10px_40px_-10px_rgba(255,107,44,.5)] sm:py-8">
        <div className="flex w-max animate-marquee">{row(false)}{row(true)}</div>
      </div>
    </div>
  );
}
