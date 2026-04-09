"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TextCoverReveal } from "@/components/ui/TextCoverReveal";
import type { EducationItem } from "@/content/site";

// Scroll progress: 0 when section enters view, 1 when section exits. We use the first 40% of scroll for the "compress inward" motion.
const MOTION_PROGRESS_END = 0.4;
const COLUMN_OFFSET_PX = 140;
const SEAL_VISIBLE_START = 0.33; // 1/3 visible
const SEAL_VISIBLE_END = 0.5; // 1/2 visible
const SEAL_OPACITY = 0.17;

function EducationBlock({ item }: { item: EducationItem }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium tracking-[0.2em] text-neutral-500">
        {item.period}
      </p>
      <h3 className="text-lg font-semibold text-white">
        <TextCoverReveal text={item.school} className="whitespace-pre-line leading-snug" />
      </h3>
      <div className="space-y-3">
        <p className="text-sm text-neutral-300">{item.degree}</p>
        {item.location ? (
          <p className="text-sm text-neutral-500">{item.location}</p>
        ) : null}
        <ul className="mt-4 space-y-2 text-sm leading-6 text-neutral-300">
          {item.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Motion runs over the first portion of scroll so columns settle quickly; no bounce, no opacity fade.
  const motionT = useTransform(
    scrollYProgress,
    [0, MOTION_PROGRESS_END],
    [0, 1]
  );

  const columbiaX = useTransform(motionT, [0, 1], [-COLUMN_OFFSET_PX, 0]);
  const uclaX = useTransform(motionT, [0, 1], [COLUMN_OFFSET_PX, 0]);

  // Seals: start at ~1/3 visible (translate so 2/3 off-screen), ease to ~1/2 visible.
  const sealT = useTransform(
    scrollYProgress,
    [0, MOTION_PROGRESS_END],
    [0, 1]
  );
  const columbiaSealX = useTransform(
    sealT,
    [0, 1],
    [`${-(1 - SEAL_VISIBLE_START) * 100}%`, `${-(1 - SEAL_VISIBLE_END) * 100}%`]
  );
  const uclaSealX = useTransform(
    sealT,
    [0, 1],
    [`${(1 - SEAL_VISIBLE_START) * 100}%`, `${(1 - SEAL_VISIBLE_END) * 100}%`]
  );

  const [columbia, ucla] = site.education;

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative z-10 min-h-[110vh] scroll-mt-24 overflow-x-hidden bg-[#0b1220] py-24 sm:scroll-mt-28 sm:py-32 md:py-36"
    >
      {/* Columbia seal — left edge */}
      <div className="pointer-events-none absolute left-0 top-1/2 z-0 hidden h-[min(900px,95vw)] w-[min(900px,95vw)] -translate-y-1/2 md:block">
        <motion.div
          className="relative h-full w-full"
          style={{ x: columbiaSealX, opacity: SEAL_OPACITY }}
        >
          <Image
            src="/images/seal-columbia-clean.png"
            alt=""
            fill
            className="object-contain object-left grayscale saturate-0 brightness-125 contrast-75"
            sizes="(max-width: 768px) 0px, 900px"
          />
        </motion.div>
      </div>

      {/* UCLA seal — right edge */}
      <div className="pointer-events-none absolute right-0 top-1/2 z-0 hidden h-[min(900px,95vw)] w-[min(900px,95vw)] -translate-y-1/2 md:block">
        <motion.div
          className="relative h-full w-full"
          style={{ x: uclaSealX, opacity: SEAL_OPACITY }}
        >
          <Image
            src="/images/seal-ucla-clean.png"
            alt=""
            fill
            className="object-contain object-right grayscale saturate-0 brightness-125 contrast-75"
            sizes="(max-width: 768px) 0px, 900px"
          />
        </motion.div>
      </div>

      <Container className="relative z-10">
        <SectionHeading
          eyebrow="Education"
          title="Academic foundation"
          description="A strong quantitative background paired with applied, business-facing analytics."
          titleNode={
            <TextCoverReveal
              text="Academic foundation"
              duration={0.55}
              delay={0}
            />
          }
        />

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20">
          <motion.div
            className="min-w-0"
            style={{ x: columbiaX }}
          >
            <EducationBlock item={columbia} />
          </motion.div>
          <motion.div
            className="min-w-0"
            style={{ x: uclaX }}
          >
            <EducationBlock item={ucla} />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
