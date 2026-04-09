"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

const HOLD_S = 1.2;
const PUNCH_S = 0.65;
const ZOOM_S = 0.8;
const ZOOM_DELAY_S = HOLD_S + PUNCH_S;

const svgSize = {
  width: "150vmax",
  height: "150vmax",
  minWidth: "150vmax",
  minHeight: "150vmax",
};

const textProps = {
  x: "500",
  y: "500",
  textAnchor: "middle" as const,
  dominantBaseline: "central" as const,
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontWeight: "900",
  fontSize: "180",
  letterSpacing: "0.05em",
};

const easeSmooth = [0.25, 0.46, 0.45, 0.94] as const;

export function IntroScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Solid dark navy: covers page at start; fades during hollow so cutouts reveal the hero. */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[#0b1220]"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: HOLD_S,
          duration: PUNCH_S,
          ease: easeSmooth,
        }}
        aria-hidden
      />

      {/* Dark navy overlay with JYZ cutouts. Zooms after hollow transition. */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformOrigin: "50% 50%" }}
        initial={{ scale: 1 }}
        animate={{ scale: 28 }}
        transition={{
          delay: ZOOM_DELAY_S,
          duration: ZOOM_S,
          ease: easeSmooth,
        }}
        onAnimationComplete={() => onComplete()}
      >
        <svg
          className="h-[100vmin] w-[100vmin] min-h-[100vmax] min-w-[100vmax]"
          style={svgSize}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <mask id="jyz-cutout-mask">
              <rect width="1000" height="1000" fill="white" />
              <text {...textProps} fill="black">
                JYZ
              </text>
            </mask>
          </defs>
          <rect
            width="1000"
            height="1000"
            fill="#0b1220"
            mask="url(#jyz-cutout-mask)"
          />
          {/* Subtle orange directional echo/shadow for the cutout */}
          <text 
            {...textProps} 
            fill="#fb923c" 
            opacity="0.4" 
            dx="4" 
            dy="4" 
            mask="url(#jyz-cutout-mask)"
          >
            JYZ
          </text>
        </svg>
      </motion.div>

      {/* Solid off-white JYZ on top. Fades out so hollow (cutouts) is revealed, then zoom runs. */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          delay: HOLD_S,
          duration: PUNCH_S,
          ease: easeSmooth,
        }}
      >
        <svg
          className="h-[100vmin] w-[100vmin] min-h-[100vmax] min-w-[100vmax]"
          style={svgSize}
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle orange directional echo/shadow */}
          <text {...textProps} fill="#fb923c" opacity="0.4" dx="4" dy="4">
            JYZ
          </text>
          {/* Main text */}
          <text {...textProps} fill="#eef2ee">
            JYZ
          </text>
        </svg>
      </motion.div>
    </div>
  );
}
