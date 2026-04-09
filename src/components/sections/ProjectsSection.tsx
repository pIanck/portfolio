"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

function ToolPills({ tools }: { tools: string[] }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tools.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-200 transition-colors group-hover:border-white/20 group-hover:bg-white/10"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

const sectionHeadingProps = {
  eyebrow: "Work" as const,
  title: "Projects with business impact",
  titleNode: (
    <>
      <span className="block">Projects with business impact</span>
      <span className="mt-1 block text-[0.78em] font-medium tracking-normal text-neutral-300">
        项目经历
      </span>
    </>
  ),
  description:
    "A selection of analytics projects focused on forecasting, operational insight, and communication-ready outputs.",
};

function ProjectCard({
  title,
  titleZh,
  description,
  descriptionZh,
  tools,
  impact,
  impactZh,
  href,
  variant = "horizontal",
  featured = false,
}: {
  title: string;
  titleZh?: string;
  description: string;
  descriptionZh?: string;
  tools: string[];
  impact: string;
  impactZh?: string;
  href?: string;
  variant?: "horizontal" | "vertical";
  featured?: boolean;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isVertical = variant === "vertical";
  const titleClass = featured
    ? "text-xl leading-[1.2]"
    : "text-lg leading-[1.2]";
  const cardBase =
    "group relative transform-gpu rounded-2xl transition-transform hover:-translate-y-[2px]";

  // Default contour: very light outer edge + faint inner inset highlight.
  // Hover: slightly stronger edge contrast + minimal glow (no neon).
  const nonFeaturedCommon =
    "border border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[#7c3a10] via-[#4a2c1c] to-[#1b2432] shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),0_20px_50px_rgba(0,0,0,0.35)] hover:border-[rgba(249,115,22,0.3)] hover:bg-gradient-to-br hover:from-[#8a4311] hover:via-[#553124] hover:to-[#222e3f] hover:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.16),0_22px_65px_rgba(0,0,0,0.4)]";
  const featuredCommon =
    "border border-[rgba(249,115,22,0.24)] bg-gradient-to-br from-[#8a4311] via-[#553124] to-[#1b2432] shadow-[inset_0_0_0_1px_rgba(249,115,22,0.14),0_22px_60px_rgba(0,0,0,0.38)] hover:border-[rgba(249,115,22,0.34)] hover:bg-gradient-to-br hover:from-[#9a4a12] hover:via-[#623828] hover:to-[#223041] hover:shadow-[inset_0_0_0_1px_rgba(249,115,22,0.18),0_24px_72px_rgba(0,0,0,0.42)]";

  const cardCommon = featured ? featuredCommon : nonFeaturedCommon;

  const shellClass = isVertical
    ? `${cardBase} w-full min-h-[452px]`
    : `${cardBase} h-[452px] w-full flex-shrink-0 ${
        featured
          ? "min-w-[360px] max-w-[580px] sm:min-w-[520px]"
          : "min-w-[320px] max-w-[520px] sm:min-w-[460px]"
      }`;

  return (
    <div className={`${shellClass} [perspective:1400px]`}>
      <div
        className="relative h-full w-full transition-transform duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className={`${cardCommon} absolute inset-0 rounded-2xl p-6`}
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <button
            type="button"
            onClick={() => setIsFlipped(true)}
            className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white hover:bg-white/15"
          >
            中文
          </button>
          <div className="flex h-full flex-col">
            <h3 className={`font-semibold text-white ${titleClass}`}>{title}</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-300 transition-colors group-hover:text-neutral-200">
              {description}
            </p>

            <ToolPills tools={tools} />

            <div
              className={`mt-6 rounded-xl border p-4 ${
                featured ? "border-white/15 bg-neutral-950" : "border-white/10 bg-neutral-950"
              }`}
            >
              <p className="text-xs font-medium tracking-[0.2em] text-neutral-400">
                IMPACT
              </p>
              <p className="mt-2 text-sm leading-7 text-neutral-200 transition-colors group-hover:text-neutral-100">
                {impact}
              </p>
            </div>

            <div className="mt-6">
              <Button
                href={href ?? "#"}
                variant="secondary"
                external={Boolean(href && href !== "#")}
                className="w-full justify-center"
              >
                View details
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`${cardCommon} absolute inset-0 rounded-2xl p-6`}
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
          <div className="flex h-full flex-col">
            <h3 className={`font-semibold text-white ${titleClass}`}>{titleZh ?? title}</h3>
            <p className="mt-3 text-sm leading-7 text-neutral-200">
              {descriptionZh ?? description}
            </p>

            <ToolPills tools={tools} />

            <div
              className={`mt-6 rounded-xl border p-4 ${
                featured ? "border-white/15 bg-neutral-950" : "border-white/10 bg-neutral-950"
              }`}
            >
              <p className="text-xs font-medium tracking-[0.2em] text-neutral-400">
                影响
              </p>
              <p className="mt-2 text-sm leading-7 text-neutral-100">
                {impactZh ?? impact}
              </p>
            </div>

            <div className="mt-6">
              <Button
                href={href ?? "#"}
                variant="secondary"
                external={Boolean(href && href !== "#")}
                className="w-full justify-center"
              >
                查看详情
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const initialXRef = useRef(0);
  const finalXRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start end", "end start"],
  });

  const featuredIndex = 1;
  const projectsCount = site.projects.length;

  function AnimatedProjectCard({
    index,
    featured,
  }: {
    index: number;
    featured: boolean;
  }) {
    const p = site.projects[index];
    // Each card peaks at a different progress position to create staggered rhythm.
    const ideal = projectsCount <= 1 ? 0.5 : (index + 1) / (projectsCount + 1); // 0..1
    const start = Math.max(0, ideal - 0.28);
    const hold = Math.min(1, ideal + 0.18);

    const opacityPeak = featured ? 1 : 0.92;
    const opacity = useTransform(
      scrollYProgress,
      [start, ideal, hold],
      [0.18, opacityPeak, featured ? 0.86 : 0.78]
    );
    const y = useTransform(scrollYProgress, [start, ideal, hold], [18, 0, 0]);
    const x = useTransform(scrollYProgress, [start, ideal, hold], [-26, 0, 0]);
    const scale = useTransform(
      scrollYProgress,
      [start, ideal, hold],
      [featured ? 0.985 : 0.975, 1, 1]
    );
    const blurPx = useTransform(
      scrollYProgress,
      [start, ideal, hold],
      [featured ? 4 : 6, 0, 0]
    );
    const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

    return (
      <motion.div
        style={{
          opacity,
          x,
          y,
          scale,
          filter: blurFilter,
          zIndex: featured ? 3 : 1,
          willChange: "transform, opacity, filter",
        }}
        className="flex"
      >
        <ProjectCard
          title={p.title}
          titleZh={p.titleZh}
          description={p.description}
          descriptionZh={p.descriptionZh}
          tools={p.tools}
          impact={p.impact}
          impactZh={p.impactZh}
          href={p.href}
          variant="horizontal"
          featured={featured}
        />
      </motion.div>
    );
  }

  const trackX = useTransform(scrollYProgress, (v) => {
    const a = initialXRef.current;
    const b = finalXRef.current;
    const t = Math.min(v / 0.9, 1);
    const tEased = 1 - Math.pow(1 - t, 1.2);
    return a + tEased * (b - a);
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const measure = () => {
      const style = getComputedStyle(viewport);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const paddingRight = parseFloat(style.paddingRight) || 0;
      const contentWidth = viewport.clientWidth - paddingLeft - paddingRight;
      const contentCenterX = paddingLeft + contentWidth / 2;

      const firstCard = track.children[0] as HTMLElement | undefined;
      const lastCard = track.children[track.children.length - 1] as
        | HTMLElement
        | undefined;

      const firstCardOffsetLeft = firstCard ? firstCard.offsetLeft : 0;
      const firstCardWidth = firstCard ? firstCard.offsetWidth : 0;
      const lastCardOffsetLeft = lastCard ? lastCard.offsetLeft : 0;
      const lastCardWidth = lastCard ? lastCard.offsetWidth : 0;

      initialXRef.current =
        contentCenterX - (firstCardOffsetLeft + firstCardWidth / 2);
      finalXRef.current =
        contentCenterX - (lastCardOffsetLeft + lastCardWidth / 2);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="relative z-10 scroll-mt-24 bg-[#0b1220] sm:scroll-mt-28"
    >
      {/* Mobile: simple vertical stack */}
      <div className="py-20 sm:py-28 md:hidden">
        <Container>
          <SectionHeading {...sectionHeadingProps} />
          <div className="mt-10 space-y-6">
            {site.projects.map((p, index) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -18, y: 18, scale: 0.98, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <ProjectCard
                  variant="vertical"
                  title={p.title}
                  titleZh={p.titleZh}
                  description={p.description}
                  descriptionZh={p.descriptionZh}
                  tools={p.tools}
                  impact={p.impact}
                  impactZh={p.impactZh}
                  href={p.href}
                  featured={index === featuredIndex}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div ref={scrollRef} className="relative hidden h-[580vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-[#0b1220]">
          <div className="flex-shrink-0 pt-16 pb-4">
            <Container>
              <SectionHeading {...sectionHeadingProps} />
            </Container>
          </div>
          <div
            ref={viewportRef}
            className="flex flex-1 items-center overflow-hidden px-6 sm:px-8"
          >
            <motion.div
              ref={trackRef}
              style={{ x: trackX }}
              className="flex w-max gap-10"
            >
              {site.projects.map((p, index) => (
                <AnimatedProjectCard
                  key={p.title}
                  index={index}
                  featured={index === featuredIndex}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

