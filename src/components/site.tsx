import { useEffect, useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { About } from "./about";
import { Contact } from "./contact";
import { CursorGlow } from "./cursor-glow";
import { Experience } from "./experience";
import { Hero } from "./hero";
import { Intro } from "./intro";
import { MascotDivider } from "./mascot";
import { Nav } from "./nav";
import { Projects } from "./projects";
import { Skills } from "./skills";
import { Snowfall } from "./snowfall";

export function Site() {
  const [intro, setIntro] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setIntro(false), reduced ? 0 : 1400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ThemeProvider>
      <I18nProvider>
        <Snowfall />
        <CursorGlow />
        <Intro show={intro} />
        <Nav progress={progress} />
        <main className="relative z-10">
          <Hero />
          <MascotDivider kind="walk" />
          <About />
          <MascotDivider kind="wave" />
          <Experience />
          <MascotDivider kind="walk" />
          <Projects />
          <MascotDivider kind="wave" />
          <Skills />
          <MascotDivider kind="walk" />
          <Contact />
        </main>
      </I18nProvider>
    </ThemeProvider>
  );
}
