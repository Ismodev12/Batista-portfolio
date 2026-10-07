import { site } from "../data/site.js";

/* Notification de visite par e-mail, envoyée en arrière-plan.
   ---------------------------------------------------------------------------
   - Passe par Web3Forms (https://web3forms.com) : aucun serveur à gérer.
     La clé se règle dans src/data/site.js → visitNotification.accessKey.
     Tant que la clé est vide, rien n'est envoyé.
   - Une seule notification par visiteur : une fois l'e-mail parti, le navigateur
     le retient (localStorage) et n'en renvoie plus, même aux visites suivantes.
   - Aucune donnée personnelle n'est collectée : ni nom, ni e-mail, ni adresse IP.
   - Rien n'est envoyé depuis votre propre machine (localhost), pour les robots,
     ni pour les visiteurs qui ont activé « Ne pas me pister ».                    */

const STORAGE_KEY = "portfolio-visit-notified";
const ENDPOINT = "https://api.web3forms.com/submit";
const DELAY_MS = 5000; // on attend 5 s : une vraie visite, pas un passage éclair

const alreadyNotified = () => { try { return localStorage.getItem(STORAGE_KEY) !== null; } catch { return true; } };
const remember = () => { try { localStorage.setItem(STORAGE_KEY, new Date().toISOString()); } catch { /* stockage indisponible */ } };

function shouldSkip() {
  const { hostname } = window.location;
  if (["localhost", "127.0.0.1", "[::1]"].includes(hostname) || hostname.endsWith(".local")) return true;
  if (navigator.webdriver) return true;
  if (/bot|crawl|spider|slurp|lighthouse|headless|preview|facebookexternalhit|whatsapp/i.test(navigator.userAgent)) return true;
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") return true;
  return false;
}

function describeVisit() {
  const ua = navigator.userAgent;
  const device = /Mobi|Android|iPhone/i.test(ua) ? "Téléphone" : /iPad|Tablet/i.test(ua) ? "Tablette" : "Ordinateur";
  const browser = /Edg\//.test(ua) ? "Edge" : /OPR\//.test(ua) ? "Opera" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Autre";
  let source = "Accès direct (lien tapé, favori ou application)";
  try { if (document.referrer) source = new URL(document.referrer).hostname; } catch { /* référent illisible */ }
  return {
    "Date": new Date().toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" }),
    "Fuseau horaire": Intl.DateTimeFormat().resolvedOptions().timeZone || "inconnu",
    "Provenance": source,
    "Page": window.location.href,
    "Appareil": `${device} — ${browser}`,
    "Écran": `${window.screen.width} × ${window.screen.height}`,
    "Langue": navigator.language,
  };
}

export function notifyVisitOnce() {
  const key = site.visitNotification?.accessKey;
  if (!key || alreadyNotified() || shouldSkip()) return;

  const send = async () => {
    if (alreadyNotified()) return; // un autre onglet a pu envoyer entre-temps
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `Nouvelle visite sur le portfolio de ${site.name}`,
          from_name: `Portfolio ${site.name}`,
          ...describeVisit(),
        }),
        keepalive: true,
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) remember(); // en cas d'échec, on réessaiera à la prochaine visite
    } catch { /* hors ligne ou service indisponible : silencieux pour le visiteur */ }
  };

  const timer = setTimeout(send, DELAY_MS);
  return () => clearTimeout(timer);
}
