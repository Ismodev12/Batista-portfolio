import { useEffect } from "react";
import { notifyVisitOnce } from "./lib/visitNotifier.js";
import Curtain from "./components/Curtain.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import About from "./components/About.jsx";
import Marquee from "./components/Marquee.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Process from "./components/Process.jsx";
import Team from "./components/Team.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  // Prévient par e-mail lors d'une nouvelle visite (voir src/lib/visitNotifier.js).
  useEffect(() => notifyVisitOnce(), []);

  return (
    <>
      <Curtain />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <About />
        <Skills />
        <Projects />
        <Process />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
