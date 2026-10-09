// Équipe — les personnes avec qui Batista travaille.
// Pour chaque personne : nom, poste, photo et lien facultatif (LinkedIn…).
// Les photos sont détourées (fond transparent, format .webp) et rangées dans public/assets/images/team/.
// Pour une nouvelle personne, une photo classique (.jpg) fonctionne aussi.
const photo = (file) => `/assets/images/team/${file}`;

export const team = [
  { name: "Lisette OBOGNON", role: "Développeuse backend", photo: photo("lisette-cut.webp"), link: "" },
  { name: "Bhilal CHITOU", role: "Développeur JS full-stack", photo: photo("bhilal-cut.webp"), link: "" },
  { name: "Ismael Fullbuster", role: "Développeur web full-stack JS", photo: photo("ismael-cut.webp"), link: "" },
  { name: "Elvire FADEGNON", role: "Développeuse Laravel & React", photo: photo("elvire-cut.webp"), link: "" },
  { name: "Eurydoxie Yantikoua", role: "Designeuse UI/UX & développeuse frontend", photo: photo("eurydoxie-cut.webp"), link: "" },
];
