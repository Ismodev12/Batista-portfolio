# Portfolio — Batista Segla

React.js + Tailwind CSS (Vite). Front-end uniquement.

## Démarrer

```bash
npm install     # installe les dépendances ET télécharge les photos (Unsplash)
npm run dev     # http://localhost:5173
npm run build   # version de production dans dist/
```

Si les photos n'ont pas été téléchargées (pas de connexion) : `npm run images`.

## Personnaliser

| Quoi | Où |
| --- | --- |
| Nom, e-mail, liens, stats, about, process | `src/data/site.js` |
| Projets (textes, image, lien, composition) | `src/data/projects.js` |
| Compétences et icônes | `src/data/skills.js` |
| Équipe (noms, postes, photos) | `src/data/team.js` + `public/assets/images/team/` |
| Couleurs (3) et typographie | `tailwind.config.js` |

## Images

Remplacez simplement les fichiers en gardant le même nom :

```
public/assets/images/hero/batista-hero.jpg       (portrait, idéalement 4:5)
public/assets/images/about/batista-about.jpg
public/assets/images/projects/nova-shop.jpg
public/assets/images/projects/carely.jpg
public/assets/images/projects/urgensia.jpg
public/assets/images/projects/delibar.jpg
public/assets/icons/*.svg                        (Simple Icons + Lucide)
```

Les images sont affichées en noir & blanc pour respecter la palette ; retirez `grayscale`
dans `src/components/ui.jsx` (composant `Media`) pour les afficher en couleur.
