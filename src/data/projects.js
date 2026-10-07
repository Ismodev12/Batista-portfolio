// Projets — remplacez image, textes et liens ici.
// layout : "full" | "right" | "left" | "panel" (composition de la carte).
// aspect / position (facultatifs) : format du cadre et cadrage de l'image, pour les mises en page "left" et "right".
const stack = ["React.js", "Tailwind CSS", "Laravel"];

export const projects = [
  {
    n: "01", name: "Nova Shop", type: "Plateforme e-commerce", layout: "full",
    tagline: "Plateforme e-commerce moderne.",
    description: "Une expérience d’achat pensée pour être rapide, intuitive et agréable.",
    image: "/assets/images/projects/nova-shop.jpg", stack, link: "#",
  },
  {
    n: "02", name: "Carely", type: "Prise de rendez-vous", layout: "right",
    tagline: "Plateforme de prise de rendez-vous.",
    description: "Une application web permettant de découvrir un professionnel, consulter ses disponibilités et réserver un rendez-vous.",
    image: "/assets/images/projects/carely.jpg", aspect: "aspect-[36/25]", stack, link: "#",
  },
  {
    n: "03", name: "Urgensia", type: "Pré-triage médical", layout: "left",
    tagline: "Plateforme de pré-triage médical.",
    description: "Une plateforme numérique de pré-triage pour les établissements de santé du Bénin, basée sur le Système Manchester, qui oriente rapidement les patients aux urgences.",
    image: "/assets/images/projects/urgensia.jpg", aspect: "aspect-[4/3] sm:aspect-[16/9]", position: "object-left", stack, link: "#",
  },
  {
    n: "04", name: "Delibar", type: "Site de restaurant", layout: "panel",
    tagline: "Site vitrine pour un restaurant de burgers.",
    description: "Un site gourmand qui met en avant les offres du moment, la carte et la livraison, pour donner envie de commander.",
    image: "/assets/images/projects/delibar.jpg", stack, link: "#",
  },
];
