"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroTitleRevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeroTitleReveal({ children, className }: HeroTitleRevealProps) {
  const lines =
    typeof children === "string" ? children.split("\n") : [children];

  return (
    <div className={cn("inline-block text-left align-top", className)}>
      {lines.map((line, index) => (
        <div key={index} className="relative overflow-hidden">
          <motion.div
            initial={{ x: "0%" }}
            animate={{ x: "110%" }}
            transition={{
              duration: 0.8,
              ease: [0.26, 0.54, 0.32, 0.99],
              delay: 0.15 * index,
            }}
            className="pointer-events-none absolute inset-y-[15%] left-0 z-20 w-full bg-neutral-950"
          />

          <div className="relative z-10">
            {line}
          </div>
        </div>
      ))}
    </div>
  );
}

type SectionTitleRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function SectionTitleReveal({
  children,
  className,
  delay = 0,
}: SectionTitleRevealProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <motion.div
        initial={{ x: "0%" }}
        whileInView={{ x: "110%" }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{
          duration: 0.6,
          ease: [0.26, 0.54, 0.32, 0.99],
          delay,
        }}
        className="pointer-events-none absolute inset-y-[30%] left-0 w-full bg-neutral-950"
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

