import { useState } from "react";
import { site } from "../data/site.js";
import { Arrow } from "./ui.jsx";

const subjects = ["Projet freelance", "Collaboration", "Opportunité", "Autre"];

const field =
  "peer w-full border-b border-bone/25 bg-transparent pb-3 pt-7 font-display text-lg text-bone outline-none transition-colors duration-300 placeholder:text-transparent focus:border-accent sm:text-xl";
const label =
  "pointer-events-none absolute left-0 top-7 font-display text-lg text-mist-dim transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] sm:text-xl";

/**
 * Formulaire sans backend : à l'envoi, il ouvre la messagerie du visiteur
 * avec un e-mail pré-rempli adressé à `site.email`.
 * Pour un envoi direct, remplacez `handleSubmit` par un appel à votre service
 * (Formspree, EmailJS, API Laravel…).
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${form.subject} — ${form.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-ink p-7 text-bone sm:p-12">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Écrivez-moi<span className="text-accent">.</span></h3>
        <span className="eyebrow text-accent">( Formulaire )</span>
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="relative">
          <input id="cf-name" type="text" required autoComplete="name" placeholder="Nom" value={form.name} onChange={set("name")} className={field} />
          <label htmlFor="cf-name" className={label}>Votre nom</label>
        </div>
        <div className="relative">
          <input id="cf-email" type="email" required autoComplete="email" placeholder="E-mail" value={form.email} onChange={set("email")} className={field} />
          <label htmlFor="cf-email" className={label}>Votre e-mail</label>
        </div>
      </div>

      <fieldset className="mt-10">
        <legend className="eyebrow text-mist-dim">Sujet</legend>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {subjects.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="subject" value={s} checked={form.subject === s} onChange={set("subject")} className="peer sr-only" />
              <span className="block rounded-full border border-bone/25 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-bone peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent sm:text-base">{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="relative mt-6">
        <textarea id="cf-message" required rows={4} placeholder="Message" value={form.message} onChange={set("message")} className={`${field} resize-none`} />
        <label htmlFor="cf-message" className={label}>Parlez-moi de votre projet</label>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm text-mist-dim" aria-live="polite">
          {sent ? "Votre messagerie s’ouvre avec le message prêt à envoyer. Merci !" : "Réponse sous 48 h, promis."}
        </p>
        <button type="submit" className="btn group bg-accent !py-3 !pl-8 !pr-3 text-ink hover:bg-bone">
          Envoyer le message
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 group-hover:rotate-45"><Arrow /></span>
        </button>
      </div>
    </form>
  );
}
