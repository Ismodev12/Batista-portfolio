import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";
import { Reveal } from "./ui.jsx";

export default function Projects() {
  return (
    <section id="projects" className="shell py-24 sm:py-32">
      <div className="grid items-end gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow text-accent">( Projets — {String(projects.length).padStart(2, "0")} )</p>
          <h2 className="mt-8 font-display text-mega font-bold">Projets<br /><span className="lg:pl-[14%]">sélec<span className="text-accent">tionnés</span></span></h2>
        </Reveal>
        <Reveal delay={120} className="font-display text-xl leading-snug text-mist sm:text-2xl lg:col-span-4 lg:pb-4">
          Des expériences web conçues pour résoudre de vrais problèmes.
        </Reveal>
      </div>
      <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
        {projects.map((p) => <ProjectCard key={p.name} project={p} />)}
      </div>
    </section>
  );
}
