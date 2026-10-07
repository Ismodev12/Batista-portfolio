// Informations personnelles — tout se modifie ici.
export const site = {
  name: "Batista Segla",
  role: "Développeuse web junior",
  email: "batista.segla@example.com",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
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
  { label: "Basée en", value: "Afrique de l’Ouest", icon: "/assets/icons/location.svg" },
  { label: "Rôle", value: "Développeuse web junior", icon: "/assets/icons/role.svg" },
  { label: "Spécialité", value: "Frontend & Full-stack", icon: "/assets/icons/focus.svg" },
  // `tags` : la valeur est affichée sous forme de pastilles.
  { label: "Approche", tags: ["Simple", "Utile", "Élégant"], icon: "/assets/icons/approach.svg" },
];

export const process = [
  { n: "01", title: "Découvrir", text: "Comprendre le problème." },
  { n: "02", title: "Concevoir", text: "Construire une expérience claire." },
  { n: "03", title: "Développer", text: "Transformer le design en produit." },
  { n: "04", title: "Affiner", text: "Tester et améliorer chaque détail." },
];
