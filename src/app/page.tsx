"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { IntroScreen } from "@/components/IntroScreen";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [projectsActive, setProjectsActive] = useState(false);
  const transitionStageRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);
  const suppressTransitionUntilRef = useRef(0);
  const transitionDurationMs = 850;
  const navSuppressMs = 1100;

  useEffect(() => {
    const handleNavScrollStart = (event: Event) => {
      const customEvent = event as CustomEvent<{ href?: string }>;
      const href = customEvent.detail?.href;
      suppressTransitionUntilRef.current = Date.now() + navSuppressMs;
      isAnimatingRef.current = true;

      // Lock to intended target during programmatic nav jumps.
      if (href === "#projects") {
        setProjectsActive(true);
      } else if (href === "#education") {
        setProjectsActive(false);
      }

      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, navSuppressMs);
    };

    window.addEventListener("nav-scroll-start", handleNavScrollStart as EventListener);
    return () => {
      window.removeEventListener("nav-scroll-start", handleNavScrollStart as EventListener);
    };
  }, []);

  useEffect(() => {
    const updateDepthState = () => {
      const stageEl = transitionStageRef.current;
      if (!stageEl || isAnimatingRef.current) return;
      if (Date.now() < suppressTransitionUntilRef.current) return;

      // Delayed trigger: let Education settle before switching layers.
      // We also use hysteresis to avoid flip-flop near the boundary.
      const activateThresholdY = -window.innerHeight * 0.22;
      const deactivateThresholdY = window.innerHeight * 0.12;
      const stageTop = stageEl.getBoundingClientRect().top;
      const nextProjectsActive = projectsActive
        ? stageTop <= deactivateThresholdY
        : stageTop <= activateThresholdY;

      setProjectsActive((prev) => {
        if (prev === nextProjectsActive) return prev;
        isAnimatingRef.current = true;
        window.setTimeout(() => {
          isAnimatingRef.current = false;
        }, transitionDurationMs);
        return nextProjectsActive;
      });
    };

    updateDepthState();
    window.addEventListener("scroll", updateDepthState, { passive: true });
    window.addEventListener("resize", updateDepthState);
    return () => {
      window.removeEventListener("scroll", updateDepthState);
      window.removeEventListener("resize", updateDepthState);
    };
  }, [projectsActive]);

  return (
    <>
      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}
      <div className="min-h-screen overflow-x-clip bg-neutral-950 text-white">
        <Navbar />
        <main className="overflow-x-clip">
          <HeroSection />
          <AboutSection />
          <section
            ref={transitionStageRef}
            className="relative isolate z-10 min-h-[140vh] overflow-x-clip bg-neutral-950 md:min-h-[580vh]"
          >
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                projectsActive
                  ? { scale: 0.92, opacity: 0, y: -40, filter: "blur(6px)" }
                  : { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }
              }
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: projectsActive ? "none" : "auto" }}
            >
              <EducationSection />
            </motion.div>
            <motion.div
              className="absolute inset-0"
              initial={false}
              animate={
                projectsActive
                  ? { scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }
                  : { scale: 1.08, opacity: 0, y: 40, filter: "blur(6px)" }
              }
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              style={{ pointerEvents: projectsActive ? "auto" : "none" }}
            >
              <ProjectsSection />
            </motion.div>
          </section>
          <section className="sticky top-0 z-0 h-screen overflow-hidden">
            <SkillsSection />
          </section>
          <ExperienceSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
