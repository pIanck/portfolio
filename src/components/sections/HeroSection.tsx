"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const count = window.innerWidth < 768 ? 120 : 350;
      const colors = ["#ffffff", "#0891b2", "#1e3a8a"];
      
      for (let i = 0; i < count; i++) {
        const u = 1 - Math.random();
        const v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        const spread = z * 80;

        particles.push({
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.0006 + 0.0002,
          spread: spread,
          r: Math.random() * 1.2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.3 + 0.05,
          cxOffset: (Math.random() - 0.5) * 40,
          cyOffset: (Math.random() - 0.5) * 40,
          dx: 0,
          dy: 0,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width * 0.35;
      const cy = canvas.height * 0.5;
      const rx = Math.max(canvas.width * 0.3, 300);
      const ry = Math.max(canvas.height * 0.45, 300);
      
      const tilt = -Math.PI / 8;
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      // Interaction constants
      const INTERACTION_RADIUS = 150;
      const REPULSION_FORCE = 3.5;
      const RETURN_SPEED = 0.02;

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      particles.forEach((p) => {
        p.angle += p.speed;

        const x0 = (rx + p.spread) * Math.cos(p.angle);
        const y0 = (ry + p.spread) * Math.sin(p.angle);

        const targetX = cx + p.cxOffset + x0 * cosTilt - y0 * sinTilt;
        const targetY = cy + p.cyOffset + x0 * sinTilt + y0 * cosTilt;

        const currentX = targetX + p.dx;
        const currentY = targetY + p.dy;

        const dxMouse = currentX - mouseX;
        const dyMouse = currentY - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < INTERACTION_RADIUS && distMouse > 0.1) {
          const force = (INTERACTION_RADIUS - distMouse) / INTERACTION_RADIUS;
          p.dx += (dxMouse / distMouse) * force * REPULSION_FORCE;
          p.dy += (dyMouse / distMouse) * force * REPULSION_FORCE;
        } else {
          p.dx += (0 - p.dx) * RETURN_SPEED;
          p.dy += (0 - p.dy) * RETURN_SPEED;
        }

        ctx.beginPath();
        ctx.arc(targetX + p.dx, targetY + p.dy, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.8 }}
    />
  );
}

export function HeroSection() {
  return (
    <section
      id="top"
      className="sticky top-0 z-0 flex h-screen flex-col justify-center overflow-hidden bg-[#0b1220] pt-20 sm:pt-24"
    >
      <HeroParticles />
      <Container className="relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12 items-center">
          
          {/* Left Column: 3-Layer Wordmark */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex justify-start relative order-last lg:order-first mt-8 lg:mt-0 lg:-translate-y-16 lg:-translate-x-4"
          >
            <div className="relative select-none">
              {/* Layer 3 (Bottom) - Deep subtle blue */}
              <h1 className="absolute top-0 left-0 translate-x-[8px] translate-y-[8px] sm:translate-x-[14px] sm:translate-y-[14px] whitespace-nowrap text-[clamp(80px,11vw,160px)] font-semibold leading-[0.85] tracking-[-0.04em] text-[#1e3a8a]/30 blur-[1px]">
                JY Zhao
              </h1>
              
              {/* Layer 2 (Middle) - Cyan/blue tint */}
              <h1 className="absolute top-0 left-0 translate-x-[4px] translate-y-[4px] sm:translate-x-[7px] sm:translate-y-[7px] whitespace-nowrap text-[clamp(80px,11vw,160px)] font-semibold leading-[0.85] tracking-[-0.04em] text-[#0891b2]/50">
                JY Zhao
              </h1>
              
              {/* Layer 1 (Top) - Main readable white */}
              <h1 className="relative whitespace-nowrap text-[clamp(80px,11vw,160px)] font-semibold leading-[0.85] tracking-[-0.04em] text-[#eef2ee]">
                JY Zhao
              </h1>

              {/* Chinese Name - Subtle signature */}
              <div 
                className="absolute -bottom-6 right-2 sm:-bottom-8 sm:-right-4 flex items-center justify-end"
              >
                <span className="text-sm sm:text-base font-normal tracking-[0.4em] text-[#b8c3bc]/60 uppercase">
                  赵继源
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex flex-col items-start text-left lg:pl-8 xl:pl-12"
          >
            {/* 1. Small top line */}
            <Badge className="px-3 py-1 text-[11px] font-medium tracking-[0.24em] uppercase text-neutral-500">
              MS in Applied Analytics · Columbia University
            </Badge>

            {/* 2. Field line */}
            <p className="mt-8 text-pretty text-[13px] font-semibold uppercase tracking-[0.16em] text-[#5c675f]">
              Data Analytics · Supply Chain · Forecasting
            </p>

            {/* 3. Value line */}
            <p className="mt-6 max-w-[400px] text-pretty text-[clamp(24px,2.5vw,36px)] font-medium leading-[1.25] tracking-tight text-[#eef2ee]">
              Turning complex data into clear operational decisions.
            </p>

            {/* 4. Buttons */}
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <Button
                href="#projects"
                variant="primary"
                className="border-[#fb923c]/60 bg-[#fb923c] text-[#1b1205] hover:bg-[#fdba74]"
              >
                View Work
              </Button>
              <Button href="/resume.pdf" variant="secondary" external={false} download>
                Resume
              </Button>
            </div>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
}
