// Équipe — les personnes avec qui Batista travaille.
// Pour chaque personne : nom, poste, photo (fichier dans public/assets/images/team/) et lien facultatif.
// Ajoutez ou retirez des lignes librement : la grille s'adapte.
const photo = (file) => `/assets/images/team/${file}`;

export const team = [
  { name: "Lisette OBOGNON", role: "Développeuse backend", photo: photo("lisette.jpg"), link: "" },
  { name: "Bhilal CHITOU", role: "Développeur JS full-stack", photo: photo("bhilal.jpg"), link: "" },
  { name: "Ismael Fullbuster", role: "Développeur web full-stack JS", photo: photo("ismael.jpg"), link: "" },
  { name: "Elvire FADEGNON", role: "Développeuse Laravel & React", photo: photo("elvire.jpg"), link: "" },
  { name: "Eurydoxie Yantikoua", role: "Designeuse UI/UX & développeuse frontend", photo: photo("eurydoxie.jpg"), link: "" },
];
