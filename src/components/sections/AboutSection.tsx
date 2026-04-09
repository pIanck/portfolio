"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";

const constructionLines = [
  // STAGE 1: Major Construction Lines (0-3)
  { path: "M 610 0 L 610 610", stroke: "rgba(232, 202, 144, 0.45)", strokeWidth: 1.2, delay: 0.0, duration: 1.0, ease: "easeInOut" },
  { path: "M 610 233 L 987 233", stroke: "rgba(232, 202, 144, 0.45)", strokeWidth: 1.2, delay: 0.3, duration: 0.8, ease: "easeInOut" },
  { path: "M 754 0 L 754 233", stroke: "rgba(232, 202, 144, 0.45)", strokeWidth: 1.2, delay: 0.6, duration: 0.6, ease: "easeInOut" },
  { path: "M 610 144 L 754 144", stroke: "rgba(232, 202, 144, 0.45)", strokeWidth: 1.2, delay: 0.9, duration: 0.5, ease: "easeInOut" },

  // STAGE 3: Medium Internal Subdivision Lines
  { path: "M 699 144 L 699 233", stroke: "rgba(232, 202, 144, 0.55)", strokeWidth: 1.5, delay: 3.6, duration: 0.4, ease: "easeInOut" },
  { path: "M 699 178 L 754 178", stroke: "rgba(232, 202, 144, 0.55)", strokeWidth: 1.5, delay: 4.4, duration: 0.3, ease: "easeInOut" },
  { path: "M 720 144 L 720 178", stroke: "rgba(232, 202, 144, 0.55)", strokeWidth: 1.5, delay: 5.0, duration: 0.3, ease: "easeInOut" },

  // STAGE 4: Tiny Center Subdivision Lines
  { path: "M 699 165 L 720 165", stroke: "rgba(232, 202, 144, 0.85)", strokeWidth: 2.0, delay: 5.6, duration: 0.2, ease: "easeInOut", lineCap: "square" },
  { path: "M 712 165 L 712 178", stroke: "rgba(232, 202, 144, 0.85)", strokeWidth: 2.0, delay: 5.8, duration: 0.2, ease: "easeInOut", lineCap: "square" },
  { path: "M 712 170 L 720 170", stroke: "rgba(232, 202, 144, 1)", strokeWidth: 2.0, delay: 6.0, duration: 0.15, ease: "easeInOut", lineCap: "square" },
  { path: "M 715 165 L 715 170", stroke: "rgba(232, 202, 144, 1)", strokeWidth: 2.0, delay: 6.15, duration: 0.15, ease: "easeInOut", lineCap: "square" },
  { path: "M 712 168 L 715 168", stroke: "rgba(232, 202, 144, 1)", strokeWidth: 2.0, delay: 6.3, duration: 0.1, ease: "easeInOut", lineCap: "square" },
  { path: "M 714 168 L 714 170", stroke: "rgba(232, 202, 144, 1)", strokeWidth: 2.0, delay: 6.4, duration: 0.1, ease: "easeInOut", lineCap: "square" },
];

const continuousSpiralPath = "M 0 0 A 610 610 0 0 0 610 610 A 377 377 0 0 0 987 233 A 233 233 0 0 0 754 0 A 144 144 0 0 0 610 144 A 89 89 0 0 0 699 233 A 55 55 0 0 0 754 178 A 34 34 0 0 0 720 144 A 21 21 0 0 0 699 165 A 13 13 0 0 0 712 178 A 8 8 0 0 0 720 170 A 5 5 0 0 0 715 165 A 3 3 0 0 0 712 168 A 2 2 0 0 0 714 170";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 min-h-screen overflow-hidden bg-[#0b1220] py-24 sm:py-32"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <svg
          className="absolute inset-0 h-full w-full opacity-60"
          viewBox="-2 -2 991 614"
          preserveAspectRatio="xMaxYMid meet"
        >
          <g transform="translate(-120, 0)">
            {/* Construction Lines */}
            {constructionLines.map((item) => (
              <motion.path
                key={item.path}
                d={item.path}
                fill="none"
                stroke={item.stroke}
                strokeWidth={item.strokeWidth}
                strokeLinecap={(item as any).lineCap || "round"}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.01 }}
                transition={{
                  pathLength: {
                    duration: item.duration,
                    delay: item.delay,
                    ease: item.ease,
                  },
                  opacity: {
                    duration: 0.01,
                    delay: item.delay,
                  }
                }}
              />
            ))}
            
            {/* Continuous Golden Spiral */}
            <motion.path
              d={continuousSpiralPath}
              fill="none"
              stroke="rgba(232, 202, 144, 0.65)"
              strokeWidth={1.8}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.01 }}
              transition={{
                pathLength: {
                  duration: 4.5, // Total duration for the single continuous stroke
                  delay: 1.2,    // Starts after the initial construction lines
                  ease: [0.4, 0, 0.2, 1], // Smooth easing for the entire spiral
                },
                opacity: {
                  duration: 0.01,
                  delay: 1.2,
                }
              }}
            />
          </g>
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgba(11,18,32,0.08),rgba(11,18,32,0.38)_58%,rgba(11,18,32,0.62)_100%)]" />
      </motion.div>

      <Container className="max-w-[80rem] px-4 sm:px-6 lg:px-3 xl:px-4">
        <motion.div
          className="relative z-10 grid gap-14 lg:grid-cols-12 lg:gap-14 xl:gap-20"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.95, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Traits on the left */}
          <div className="lg:col-span-4 lg:col-start-2 lg:mt-32 xl:mt-40 lg:-translate-x-14">
            <div className="flex flex-col gap-5 sm:gap-6 relative">
              {site.about.highlights.map((item, idx) => {
                // Calculate stepped offset to follow the golden curve
                // Base left offset is 0, increasing as we go down
                const stepOffsets = [0, 26, 70, 114]; // Matches the requested left pixel offsets (52, 78, 122, 166) relative to the first item
                
                return (
                  <motion.div
                    key={item}
                    className="group cursor-default space-y-2 border-l border-[rgba(210,225,215,0.14)] pl-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[rgba(210,225,215,0.25)] sm:pl-5"
                    style={{ marginLeft: `${stepOffsets[idx] || 0}px` }}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.7,
                      delay: 1.05 + idx * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#6f7a73]">
                      {String(idx + 1).padStart(2, "0")}
                    </p>
                    <p className="text-[clamp(14px,1.1vw,16px)] font-normal leading-[1.6] text-[#b8c3bc] whitespace-nowrap">
                      {item}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </Container>

      {/* About me under the red corner on the right */}
      <motion.div 
        className="relative mt-20 px-4 sm:px-6 lg:absolute lg:top-[55%] lg:left-[60%] lg:-translate-y-1/2 lg:mt-0 lg:w-[40%] lg:px-0 z-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.95, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#7f8d84]">
          OVERVIEW
        </p>

        <h2 className="mt-4 max-w-lg text-balance text-[clamp(30px,3.1vw,42px)] font-semibold leading-[1.08] tracking-[-0.028em] text-[#eef2ee]">
          {site.about.title}
        </h2>

        <p className="mt-6 max-w-[52ch] text-pretty text-[clamp(16px,1.1vw,20px)] font-normal leading-[1.75] text-[#b8c3bc]">
          <span className="block">I work where data meets operations.</span>
          <span className="mt-2 block">I turn data into decisions.</span>
          <span className="mt-2 block">我把数据变成决策。我专注于数据与业务的交界。</span>
        </p>
      </motion.div>
    </section>
  );
}

