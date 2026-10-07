// Compétences — les icônes sont des SVG locaux dans /public/assets/icons/.
const icon = (name) => `/assets/icons/${name}.svg`;

// Les 3 technologies dominantes.
export const coreSkills = [
  { n: "01", name: "React.js", role: "Développement d’interfaces", icon: icon("react"),
    detail: "Composants réutilisables, hooks, état local et consommation d’API." },
  { n: "02", name: "Tailwind CSS", role: "Systèmes UI modernes", icon: icon("tailwindcss"),
    detail: "Intégration fidèle des maquettes, design responsive et systèmes cohérents." },
  { n: "03", name: "Laravel", role: "Applications web", icon: icon("laravel"),
    detail: "Routes, contrôleurs, Eloquent et API REST pour des applications complètes." },
];

export const skillGroups = [
  { n: "01", title: "Frontend", items: [
    { name: "React.js", icon: icon("react") },
    { name: "Tailwind CSS", icon: icon("tailwindcss") },
    { name: "JavaScript", icon: icon("javascript") },
    { name: "TypeScript", icon: icon("typescript"), note: "en apprentissage" },
    { name: "HTML5", icon: icon("html5") },
    { name: "CSS3", icon: icon("css") },
    { name: "Design responsive", icon: icon("responsive") },
    { name: "Intégration UI", icon: icon("ui-integration") },
  ]},
  { n: "02", title: "Backend", items: [
    { name: "Laravel", icon: icon("laravel") },
    { name: "PHP", icon: icon("php") },
    { name: "API REST", icon: icon("rest-api") },
    { name: "Intégration d’API", icon: icon("api-integration") },
    { name: "MySQL", icon: icon("mysql") },
  ]},
  { n: "03", title: "Outils", items: [
    { name: "Git", icon: icon("git") },
    { name: "GitHub", icon: icon("github") },
    { name: "Figma", icon: icon("figma") },
    { name: "Postman", icon: icon("postman") },
    { name: "Vite", icon: icon("vite") },
  ]},
];
