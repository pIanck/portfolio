"use client";

import { useRef, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import type { ExperienceItem } from "@/content/site";

// Quadratic bezier point: P0, P1, P2. t in [0,1].
// Path in normalized 0..1: P0=(0,0), P1=(0.32, 0.5), P2=(0, 1) — curves right.
function getPointOnCurve(t: number): { x: number; y: number } {
  const x0 = 0;
  const y0 = 0;
  const x1 = 32;
  const y1 = 50;
  const x2 = 0;
  const y2 = 100;
  const mt = 1 - t;
  return {
    x: mt * mt * x0 + 2 * mt * t * x1 + t * t * x2,
    y: mt * mt * y0 + 2 * mt * t * y1 + t * t * y2,
  };
}

const SECTION_SCROLL_HEIGHT_VH = 80; // vh per experience item for scroll range

// Safe left offset so card center is never too far left; with x:-50% the full card stays inside.
// Curve x is 0–16; card can be up to ~85% wide → need center ≥ ~43% so left edge ≥ 0.
const TIMELINE_SAFE_LEFT_PERCENT = 48;

function ExperienceCard({
  item,
  index,
  total,
  scrollYProgress,
  positionPercent,
}: {
  item: ExperienceItem;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  positionPercent: { x: number; y: number };
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const progressCenter = total <= 1 ? 0.5 : (2 * index + 1) / (2 * total);
  const spread = 0.35;

  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, progressCenter - spread),
      progressCenter,
      Math.min(1, progressCenter + spread),
    ],
    [0.88, 1.02, 0.88]
  );

  // Path point is the card's visual center; offset so full card stays inside timeline (no left clipping).
  const centerX = TIMELINE_SAFE_LEFT_PERCENT + positionPercent.x;
  const centerY = positionPercent.y;

  return (
    <motion.div
      className="absolute left-0 top-0 h-[308px] w-full max-w-[85%] origin-center [perspective:1400px] sm:max-w-sm"
      style={{
        left: `${centerX}%`,
        top: `${centerY}%`,
        x: "-50%",
        y: "-50%",
        scale,
        opacity: 1,
      }}
    >
      <div
        className="relative h-full w-full transition-transform duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-2xl border border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[#7c3a10] via-[#4a2c1c] to-[#1b2432] p-5 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),0_20px_50px_rgba(0,0,0,0.35)]"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <button
            type="button"
            onClick={() => setIsFlipped(true)}
            className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/15"
          >
            中文
          </button>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">
                {item.org}
                {item.location ? (
                  <span className="text-neutral-500"> • {item.location}</span>
                ) : null}
                <span className="text-neutral-400"> • {item.period}</span>
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-300">
            {item.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="absolute inset-0 rounded-2xl border border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[#7c3a10] via-[#4a2c1c] to-[#1b2432] p-5 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),0_20px_50px_rgba(0,0,0,0.35)]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <button
            type="button"
            onClick={() => setIsFlipped(false)}
            className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/15"
          >
            EN
          </button>
          <div className="flex flex-col gap-2">
            <div>
              <h3 className="text-base font-semibold text-white">{item.titleZh ?? item.title}</h3>
              <p className="mt-1 text-sm text-neutral-300">
                {item.orgZh ?? item.org}
                {item.locationZh || item.location ? (
                  <span className="text-neutral-500"> • {item.locationZh ?? item.location}</span>
                ) : null}
                <span className="text-neutral-400"> • {item.periodZh ?? item.period}</span>
              </p>
            </div>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-neutral-300">
            {(item.bulletsZh ?? item.bullets).map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const experience = site.experience;
  const n = experience.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardPositions = useMemo(() => {
    if (n <= 0) return [];
    return experience.map((_, i) => {
      const t = n <= 1 ? 0.5 : (2 * i + 1) / (2 * n);
      return getPointOnCurve(t);
    });
  }, [n, experience]);

  const sectionHeightVh = Math.max(1, n) * SECTION_SCROLL_HEIGHT_VH;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 bg-[#0b1220]"
      style={{ minHeight: `${sectionHeightVh}vh` }}
    >
      <Container className="relative py-20 sm:py-28">
        <div
          className="grid gap-12 lg:grid-cols-[minmax(400px,450px)_1fr] lg:gap-16"
          style={{ minHeight: `${sectionHeightVh}vh` }}
        >
          {/* Left: static intro — fixed width so right column stays clear */}
          <div className="lg:sticky lg:top-24 lg:self-start min-w-0">
            <p className="text-xs font-medium tracking-[0.2em] text-neutral-400">
              EXPERIENCE
            </p>
            <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              <span className="block">Leadership & applied work</span>
              <span className="mt-1 block text-[0.78em] font-medium tracking-normal text-neutral-300">
                实习经历
              </span>
            </h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-7 text-neutral-300">
              A guided journey through internships, research, leadership, and
              major projects—focused on impact and clarity.
            </p>
          </div>

          {/* Right: curved timeline — safe left padding so cards stay fully visible */}
          <div
            className="relative min-h-[380px] min-w-0 overflow-hidden pl-[6%] sm:min-h-[420px]"
            style={{ minHeight: `${sectionHeightVh}vh` }}
          >
            {/* Curved path (SVG) */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="experience-line-gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="rgba(251,146,60,0.45)" />
                  <stop offset="50%" stopColor="rgba(251,146,60,0.85)" />
                  <stop offset="100%" stopColor="rgba(251,146,60,0.45)" />
                </linearGradient>
              </defs>
              <path
                d={`M ${TIMELINE_SAFE_LEFT_PERCENT},0 Q ${TIMELINE_SAFE_LEFT_PERCENT + 16},50 ${TIMELINE_SAFE_LEFT_PERCENT},100`}
                fill="none"
                stroke="url(#experience-line-gradient)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>

            {/* Cards along the curve */}
            {experience.map((item, i) => (
              <ExperienceCard
                key={`${item.org}-${item.title}`}
                item={item}
                index={i}
                total={n}
                scrollYProgress={scrollYProgress}
                positionPercent={cardPositions[i] ?? { x: 0, y: 50 }}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
