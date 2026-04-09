"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type TextCoverRevealProps = {
  text: string;
  className?: string;
  coverClassName?: string;
  duration?: number;
  delay?: number;
  viewportAmount?: number;
  viewportMargin?: string;
};

export function TextCoverReveal({
  text,
  className,
  coverClassName,
  duration,
  delay,
  viewportAmount,
  viewportMargin,
}: TextCoverRevealProps) {
  return (
    <span
      className={cn(
        "relative inline-block overflow-hidden align-top",
        className,
      )}
    >
      <motion.span
        className={cn("pointer-events-none absolute inset-0 z-10", coverClassName || "bg-[#fb923c]")}
        initial={{ x: "0%" }}
        whileInView={{ x: "101%" }}
        viewport={{
          once: true,
          margin: viewportMargin ?? "-200px",
          ...(viewportAmount !== undefined ? { amount: viewportAmount } : { amount: 0.05 }),
        }}
        transition={{
          duration: duration ?? 1.4,
          delay: delay ?? 0.15,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
      <span className="relative z-0">{text}</span>
    </span>
  );
}

