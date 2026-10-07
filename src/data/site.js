// Informations personnelles — tout se modifie ici.
export const site = {
  name: "Batista Segla",
  role: "Développeuse web junior",
  email: "batista.segla@example.com",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  // Notification par e-mail à chaque nouveau visiteur (une seule fois par personne).
  // 1. Créez une clé gratuite sur https://web3forms.com avec l'adresse qui doit recevoir les alertes.
  // 2. Collez-la ci-dessous. Clé vide = notifications désactivées.
  visitNotification: { accessKey: "" },
  images: {
    // Portrait détouré (fond transparent : PNG ou WebP).
    hero: "/assets/images/hero/batista-hero.webp",
    about: "/assets/images/about/batista-about.jpg",
  },
};

export const navLinks = [
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: "03+", label: "Projets réalisés" },
  { value: "03", label: "Technologies principales" },
  { value: "15+", label: "Interfaces conçues" },
  { value: "100%", label: "Passion du développement" },
];

export const aboutFacts = [
  { label: "Basée en", value: "Afrique de l’Ouest" },
  { label: "Rôle", value: "Développeuse web junior" },
  { label: "Spécialité", value: "Frontend & Full-stack" },
  { label: "Approche", value: "Simple · Utile · Élégant" },
];

export const process = [
  { n: "01", title: "Découvrir", text: "Comprendre le problème." },
  { n: "02", title: "Concevoir", text: "Construire une expérience claire." },
  { n: "03", title: "Développer", text: "Transformer le design en produit." },
  { n: "04", title: "Affiner", text: "Tester et améliorer chaque détail." },
];
