"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { TextCoverReveal } from "@/components/ui/TextCoverReveal";

const CARD_WIDTH = 295;
const CARD_HEIGHT = 250;

const FAN_MAX_X = 435;
const DEFAULT_FAN = [
  { x: 0, y: 28, rotate: -10 },
  { x: 145, y: 14, rotate: -4 },
  { x: 290, y: 0, rotate: 2 },
  { x: FAN_MAX_X, y: 14, rotate: 10 },
];

const ACTIVE_LIFT = -10;
const ACTIVE_SCALE = 1.01;
const ACTIVE_ROTATE_FACTOR = 0.4;
const SPREAD_OFFSET = 72;
const INACTIVE_SCALE = 0.98;
const INACTIVE_Z = 1;

// Entrance: cluster (tighter) → fan. Same y as final so only x + rotate drive the motion.
const CLUSTER_CENTER_X = 218;
const CLUSTER_OFFSET_X = 32;
const ENTRANCE_CLUSTER = [
  { x: CLUSTER_CENTER_X - 1.5 * CLUSTER_OFFSET_X, y: DEFAULT_FAN[0].y, rotate: -3 },
  { x: CLUSTER_CENTER_X - 0.5 * CLUSTER_OFFSET_X, y: DEFAULT_FAN[1].y, rotate: -1 },
  { x: CLUSTER_CENTER_X + 0.5 * CLUSTER_OFFSET_X, y: DEFAULT_FAN[2].y, rotate: 1 },
  { x: CLUSTER_CENTER_X + 1.5 * CLUSTER_OFFSET_X, y: DEFAULT_FAN[3].y, rotate: 3 },
];
const ENTRANCE_DURATION = 0.55;
const ENTRANCE_STAGGER = 0.06;
const ENTRANCE_EASE = [0.33, 0, 0.2, 1] as const; // controlled ease-out, not floaty
const ENTRANCE_SCALE = 0.98;
const ENTRANCE_OPACITY = 0.94;

function getCardStyle(
  index: number,
  activeIndex: number | null
): { x: number; y: number; rotate: number; scale: number; zIndex: number } {
  const d = DEFAULT_FAN[index];
  if (activeIndex === null) {
    return {
      x: d.x,
      y: d.y,
      rotate: d.rotate,
      scale: 1,
      zIndex: index,
    };
  }
  if (activeIndex === index) {
    return {
      x: d.x,
      y: d.y + ACTIVE_LIFT,
      rotate: d.rotate * ACTIVE_ROTATE_FACTOR,
      scale: ACTIVE_SCALE,
      zIndex: 20,
    };
  }
  if (index < activeIndex) {
    return {
      x: d.x - SPREAD_OFFSET,
      y: d.y,
      rotate: d.rotate,
      scale: INACTIVE_SCALE,
      zIndex: INACTIVE_Z,
    };
  }
  return {
    x: d.x + SPREAD_OFFSET,
    y: d.y,
    rotate: d.rotate,
    scale: INACTIVE_SCALE,
    zIndex: INACTIVE_Z,
  };
}

const spring = { type: "spring" as const, stiffness: 280, damping: 26 };

function SkillCard({
  title,
  items,
  index,
  activeIndex,
  onEnter,
  onLeave,
  hasEnteredView,
  entranceComplete,
}: {
  title: string;
  items: string[];
  index: number;
  activeIndex: number | null;
  onEnter: () => void;
  onLeave: () => void;
  hasEnteredView: boolean;
  entranceComplete: boolean;
}) {
  const style = getCardStyle(index, activeIndex);
  const cluster = ENTRANCE_CLUSTER[index];
  const target = hasEnteredView
    ? { x: style.x, y: style.y, rotate: style.rotate, scale: style.scale, opacity: 1, zIndex: style.zIndex }
    : { x: cluster.x, y: cluster.y, rotate: cluster.rotate, scale: ENTRANCE_SCALE, opacity: ENTRANCE_OPACITY, zIndex: index };
  return (
    <motion.div
      className="absolute left-0 top-0 cursor-default rounded-2xl border border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[#7c3a10] via-[#4a2c1c] to-[#1b2432] p-6 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),0_20px_50px_rgba(0,0,0,0.35)]"
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        transformOrigin: "center center",
      }}
      initial={{
        x: cluster.x,
        y: cluster.y,
        rotate: cluster.rotate,
        scale: ENTRANCE_SCALE,
        opacity: ENTRANCE_OPACITY,
        zIndex: index,
      }}
      animate={target}
      transition={
        entranceComplete
          ? spring
          : {
              duration: ENTRANCE_DURATION,
              delay: hasEnteredView ? index * ENTRANCE_STAGGER : 0,
              ease: ENTRANCE_EASE,
            }
      }
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-neutral-200">
        {items.join(" · ")}
      </p>
    </motion.div>
  );
}

const TOOL_LOGOS = [
  {
    name: "Python",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.08.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.14-.18.22-.15.27-.09.32-.03.35.04.35.09.32.16.27.2.21.25.15.29.08.31.02.32-.04.3-.1.27-.16.22-.22.16-.27.09-.32.03-.35-.04-.35-.09-.32-.16-.27-.2-.21-.25-.15-.29-.08-.31-.02-.32.04-.3.1-.27.16-.22.22zM20.95 17.52l.23-.14.18-.22.15-.27.09-.32.03-.35-.04-.35-.09-.32-.16-.27-.2-.21-.25-.15-.29-.08-.31-.02-.32.04-.3.1-.27.16-.22.22-.16.27-.09.32-.03.35.04.35.09.32.16.27.2.21.25.15.29.08.31.02.32-.04.3-.1.27-.16.22-.22zM13.81 23.82l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h4.28l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h3.17l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.24.01h-.16l-.06-.01H9.84v.83h11.64l.01 2.75.02.37-.05.34-.11.31-.17.28-.25.26-.31.23-.38.2-.44.18-.51.15-.58.12-.64.1-.71.08-.77.04-.84.02-1.27-.05z"/></svg>
  },
  {
    name: "SQL",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 18c-4.42 0-8-1.79-8-4v-1.47c1.86 1.51 4.7 2.47 8 2.47s6.14-.96 8-2.47V16c0 2.21-3.58 4-8 4zm0-6c-4.42 0-8-1.79-8-4V8.53C5.86 10.04 8.7 11 12 11s6.14-.96 8-2.47V10c0 2.21-3.58 4-8 4zm0-6C7.58 8 4 6.21 4 4s3.58-4 8-4 8 1.79 8 4-3.58 4-8 4z"/></svg>
  },
  {
    name: "Tableau",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12.33 10.59V7.81h-1.3v2.78H8.25v1.27h2.78v2.78h1.3v-2.78h2.78v-1.27h-2.78zm-6.17 3.32v-1.63H4.99v-1.16h1.17V9.49h1.17v1.63h1.63v1.16H7.33v1.63H6.16zm11.67 0v-1.63h-1.17v-1.16h1.17V9.49h1.17v1.63h1.63v1.16h-1.63v1.63h-1.17zM6.16 7.42V5.79H4.99V4.63h1.17V3h1.17v1.63h1.63v1.16H7.33v1.63H6.16zm11.67 0V5.79h-1.17V4.63h1.17V3h1.17v1.63h1.63v1.16h-1.63v1.63h-1.17zM12.33 4.25V2.62h-1.3V1.46h1.3V0h1.27v1.46h1.63v1.16h-1.63v1.63h-1.27zm0 19.75v-1.63h-1.3v-1.16h1.3v-1.46h1.27v1.46h1.63v1.16h-1.63v1.63h-1.27zM6.16 22.54v-1.63H4.99v-1.16h1.17v-1.46h1.17v1.46h1.63v1.16H7.33v1.63H6.16zm11.67 0v-1.63h-1.17v-1.16h1.17v-1.46h1.17v1.46h1.63v1.16h-1.63v1.63h-1.17zM2.83 14.96v-1.63H1.66v-1.16h1.17V10.7h1.17v1.47h1.63v1.16H4.01v1.63H2.83zm18.34 0v-1.63h-1.17v-1.16h1.17V10.7h1.17v1.47h1.63v1.16h-1.63v1.63h-1.17z"/></svg>
  },
  {
    name: "Power BI",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M16 0h5v24h-5zM9 7h5v17H9zM2 14h5v10H2z"/></svg>
  },
  {
    name: "Excel",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M14.5 2H3v20h18V8.5L14.5 2zM14 3.5l5.5 5.5H14v-5.5zM5 20V4h7v7h7v9H5zm3.5-3l2.5-3.5L8.5 10H10l1.5 2.5L13 10h1.5l-2.5 3.5L14.5 17H13l-1.5-2.5L10 17H8.5z"/></svg>
  },
  {
    name: "Git",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.738 2.739c.64-.218 1.383-.076 1.898.44.69.69.69 1.8 0 2.49-.689.69-1.801.69-2.49 0-.512-.515-.654-1.25-.44-1.889l-2.739-2.738v3.93c.215.215.356.516.356.84 0 .689-.559 1.248-1.248 1.248-.689 0-1.248-.559-1.248-1.248 0-.324.141-.625.356-.84V9.52c-.215-.215-.356-.516-.356-.84 0-.324.141-.625.356-.84l-2.76-2.76-4.404 4.405c-.603.604-.603 1.582 0 2.188l10.48 10.479c.604.604 1.582.604 2.188 0l10.479-10.48c.604-.604.604-1.582 0-2.188z"/></svg>
  },
  {
    name: "VS Code",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>
  },
  {
    name: "R",
    svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.12 17.51l-2.48-3.92c-.32-.51-.62-.87-1.14-1.07-.48-.18-1.07-.22-1.77-.22H9.86v5.21H7.2V6.66h5.36c1.65 0 2.87.26 3.65.78.78.52 1.17 1.34 1.17 2.47 0 1.05-.39 1.83-1.16 2.34-.59.39-1.34.61-2.26.68 1.14.16 1.94.67 2.4 1.53l2.25 3.05h-1.49zm-5.33-7.23c1.08 0 1.84-.19 2.27-.58.43-.39.65-.96.65-1.7 0-.75-.22-1.33-.66-1.73-.44-.4-1.22-.6-2.35-.6H9.86v4.61h1.93z"/></svg>
  }
];

function ToolMarquee() {
  return (
    <div className="relative mt-16 md:mt-20 w-full overflow-hidden flex items-center py-6">
      {/* Subtle fade mask on left and right */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0b1220] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0b1220] to-transparent z-10 pointer-events-none" />
      
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 50, // slower and smoother
        }}
      >
        {/* We duplicate the list to make the infinite scroll seamless */}
        {[...TOOL_LOGOS, ...TOOL_LOGOS, ...TOOL_LOGOS, ...TOOL_LOGOS].map((tool, idx) => (
          <div key={idx} className="flex items-center gap-3 opacity-30 hover:opacity-80 transition-opacity text-[#fb923c]">
            {tool.svg}
            <span className="text-sm font-semibold tracking-widest uppercase">{tool.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const deckRef = useRef<HTMLDivElement>(null);
  const inView = useInView(deckRef, { once: true, amount: 0.2, margin: "0px 0px -80px 0px" });

  useEffect(() => {
    if (!inView) return;
    setHasEnteredView(true);
    const t = setTimeout(
      () => setEntranceComplete(true),
      (ENTRANCE_DURATION + site.skills.length * ENTRANCE_STAGGER) * 1000
    );
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section id="skills" className="relative z-10 bg-[#0b1220] py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-neutral-400">
            SKILLS
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            <TextCoverReveal
              text="A practical analytics toolkit"
              duration={1}
              delay={0.1}
              viewportMargin="0px 0px 140px 0px"
            />
            <span className="mt-1 block text-[0.78em] font-medium tracking-normal text-neutral-300">
              擅长技能
            </span>
          </h2>
          <motion.p
            className="mt-4 text-pretty text-base leading-7 text-neutral-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20px 0px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Balanced across programming, modeling, BI, and operations—built for
            cross-functional impact.
          </motion.p>
        </div>

        {/* Desktop: overlapping card deck — entrance: cluster → fan when in view */}
        <div ref={deckRef} className="relative mt-14 hidden md:block">
          <div
            className="relative mx-auto"
            style={{
              width: CARD_WIDTH + FAN_MAX_X + SPREAD_OFFSET,
              height: CARD_HEIGHT + 80,
            }}
          >
            {site.skills.map((g, idx) => (
              <SkillCard
                key={g.title}
                title={g.title}
                items={g.items}
                index={idx}
                activeIndex={activeIndex}
                onEnter={() => setActiveIndex(idx)}
                onLeave={() => setActiveIndex(null)}
                hasEnteredView={hasEnteredView}
                entranceComplete={entranceComplete}
              />
            ))}
          </div>
        </div>

        {/* Mobile: simple vertical stack */}
        <div className="mt-10 space-y-4 md:hidden">
          {site.skills.map((g) => (
            <div
              key={g.title}
              className="rounded-2xl border border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[#7c3a10] via-[#4a2c1c] to-[#1b2432] px-5 py-5 shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),0_20px_50px_rgba(0,0,0,0.35)]"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-300">
                {g.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-200">
                {g.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </Container>
      
      {/* Horizontally looping row of tool icons */}
      <ToolMarquee />
    </section>
  );
}
