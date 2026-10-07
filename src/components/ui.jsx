import { useEffect, useRef, useState } from "react";

let brickCount = 0;

/** Apparition au scroll façon « brique » : le bloc tombe à sa place avec un léger rebond,
 *  en alternant côté gauche / côté droit. `delay` en ms. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", style, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const side = useRef(brickCount++ % 2 ? 1 : -1).current;
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-reveal="" style={{ "--d": `${delay}ms`, "--bx": `${side * 36}px`, "--br": `${side * 2.5}deg`, ...style }} className={`${className} ${shown ? "is-in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Image locale en noir & blanc, avec repli propre si le fichier manque. */
export function Media({ src, alt, className = "", imgClassName = "", eager = false }) {
  const [missing, setMissing] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-bone/10 ${className}`}>
      {missing ? (
        <div className="absolute inset-0 grid place-items-center p-6 text-center bg-[repeating-linear-gradient(135deg,rgb(var(--c-bone)/.06)_0_2px,transparent_2px_18px)]">
          <p className="eyebrow !tracking-[0.12em] text-mist-dim break-all">Image à placer<br />public{src}</p>
        </div>
      ) : (
        <img
          src={src} alt={alt} loading={eager ? "eager" : "lazy"} onError={() => setMissing(true)}
          className={`absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05] ${imgClassName}`}
        />
      )}
    </div>
  );
}

/** Icône SVG locale teintée par la couleur du texte courant. */
export function Icon({ src, className = "h-5 w-5" }) {
  const mask = `url(${src}) center / contain no-repeat`;
  return <span aria-hidden="true" className={`inline-block shrink-0 bg-current ${className}`} style={{ mask, WebkitMask: mask }} />;
}

export function Arrow({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

/** Élément décoratif du site : fleur géométrique à quatre pétales ronds. */
export function Spark({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" fill="currentColor">
      <circle cx="50" cy="26" r="26" />
      <circle cx="74" cy="50" r="26" />
      <circle cx="50" cy="74" r="26" />
      <circle cx="26" cy="50" r="26" />
    </svg>
  );
}
