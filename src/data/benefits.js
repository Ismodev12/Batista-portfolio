// Section « Pourquoi moi » — ce que le client y gagne. Modifiez librement les textes.
const icon = (n) => `/assets/icons/benefit-${n}.svg`;

export const benefits = [
  { icon: icon("goal"), title: "Un site pensé pour vos objectifs", text: "Avant d’écrire une ligne de code, on définit ce que votre site doit vous rapporter : des contacts, des ventes, des réservations." },
  { icon: icon("fullstack"), title: "Une seule interlocutrice, du design au serveur", text: "Interface, back-end Laravel et base de données : vous n’avez qu’une personne à contacter, même quand mon équipe intervient." },
  { icon: icon("speed"), title: "Rapide et léger", text: "Des pages qui s’affichent vite, même sur une connexion mobile moyenne. Vos visiteurs ne partent pas avant d’avoir vu votre offre." },
  { icon: icon("mobile"), title: "Parfait sur téléphone", text: "La majorité de vos clients vous découvriront sur mobile : chaque écran est conçu et testé pour eux." },
  { icon: icon("talk"), title: "Vous suivez tout, sans jargon", text: "Points réguliers, démos à chaque étape et explications claires. Vous savez toujours où en est votre projet." },
  { icon: icon("quality"), title: "Un code propre qui dure", text: "Un projet structuré et documenté, facile à faire évoluer ou à reprendre plus tard, par moi ou par quelqu’un d’autre." },
];

// Comparaison « approche classique » / « avec moi ».
export const comparison = [
  ["Un devis flou, des coûts qui gonflent en route", "Un périmètre et un planning clairs dès le départ"],
  ["Des nouvelles seulement à la livraison", "Des démos régulières : vous validez au fur et à mesure"],
  ["Un modèle générique, identique à d’autres sites", "Une interface conçue pour votre activité"],
  ["Plusieurs prestataires à coordonner vous-même", "Une seule interlocutrice qui s’occupe de tout, du design à la mise en ligne"],
  ["Une livraison, puis plus personne", "Une prise en main expliquée et un suivi après la mise en ligne"],
];
