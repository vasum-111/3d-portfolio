import React, { useCallback, useEffect, useRef, useState } from "react";
import ThreeCanvas from "./components/ThreeCanvas.jsx";
import RobotAssistant, { WELCOME_GREETING } from "./components/RobotAssistant.jsx";
import {
  Header,
  HeroCard,
  AboutSection,
  ProjectsSection,
  SkillsSection,
  ContactSection,
  TourHUD,
} from "./components/GlassUI.jsx";
import { tourSteps } from "./data/content.js";

export default function App() {
  const [theme, setTheme] = useState("light");
  const [tourActive, setTourActive] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [hasGreeted, setHasGreeted] = useState(false);

  const canvasRef = useRef(null);
  const robotRef = useRef(null);
  const greetTimeout = useRef(null);

  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Play the voice greeting once automatically on page load.
  useEffect(() => {
    greetTimeout.current = setTimeout(() => {
      if (!hasGreeted) {
        robotRef.current?.speak(WELCOME_GREETING);
        setHasGreeted(true);
      }
    }, 1200);
    return () => clearTimeout(greetTimeout.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goToStep = useCallback((index) => {
    const step = tourSteps[index];
    if (!step) return;
    setStepIndex(index);
    scrollToSection(step.id);
    canvasRef.current?.flyTo(step.id);
    robotRef.current?.speak(step.voice);
  }, []);

  const startTour = useCallback(() => {
    setHasGreeted(true);
    setTourActive(true);
    goToStep(0);
  }, [goToStep]);

  const nextStep = useCallback(() => {
    const next = stepIndex + 1;
    if (next >= tourSteps.length) {
      setTourActive(false);
      return;
    }
    goToStep(next);
  }, [stepIndex, goToStep]);

  const exitTour = useCallback(() => {
    setTourActive(false);
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const exploreIndependently = useCallback(() => {
    setHasGreeted(true);
    scrollToSection("about");
  }, []);

  const onRobotActivate = useCallback(() => {
    setHasGreeted(true);
    robotRef.current?.speak(WELCOME_GREETING);
  }, []);

  return (
    <div className={isDark ? "dark" : ""}>
      <ThreeCanvas
        ref={canvasRef}
        isDark={isDark}
        robotSlot={
          <RobotAssistant ref={robotRef} isDark={isDark} onActivate={onRobotActivate} />
        }
      />

      <Header theme={theme} onToggleTheme={() => setTheme(isDark ? "light" : "dark")} />

      <main>
        <HeroCard onStartTour={startTour} onExploreIndependently={exploreIndependently} />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {tourActive && (
        <TourHUD stepIndex={stepIndex} onNext={nextStep} onExit={exitTour} />
      )}
    </div>
  );
}
