import { site } from "../data/site.js";
import ContactForm from "./ContactForm.jsx";
import { Reveal, Spark } from "./ui.jsx";

export default function Contact() {
  return (
    <section id="contact" className="p-2 sm:p-3">
      <div className="relative overflow-hidden rounded-panel bg-bone py-24 text-ink sm:py-32">
        <Spark className="absolute -right-16 -top-16 h-64 w-64 animate-spin-slow text-accent sm:h-96 sm:w-96" />
        <div className="shell relative">
          <Reveal className="eyebrow">( Contact )</Reveal>
          <Reveal as="h2" delay={80} className="mt-8 font-display text-mega font-bold">
            Une idée<br />en tête ?<br /><span className="mark">Construisons-la.</span>
          </Reveal>
          <div className="mt-14 grid items-start gap-12 lg:mt-16 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="text-xl leading-relaxed text-moss sm:text-2xl">
                Un site à créer, à refaire, ou juste une idée ? Décrivez-moi votre projet : je vous réponds avec mes questions, des pistes concrètes et un devis gratuit. Je reste aussi ouverte aux collaborations et aux opportunités.
              </p>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-display text-lg font-medium">
                <li><a className="link-line break-all" href={`mailto:${site.email}`}>{site.email}</a></li>
                <li><a className="link-line" href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></li>
                <li><a className="link-line" href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></li>
              </ul>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7">
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
