"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrollToHash = (href: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith("#")) return;
    event.preventDefault();
    window.dispatchEvent(
      new CustomEvent("nav-scroll-start", {
        detail: { href },
      })
    );
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", href);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "sticky top-0 z-50 border-b border-white/5 bg-neutral-950/70 backdrop-blur",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#top"
          onClick={(event) => scrollToHash("#top", event)}
          className="text-sm font-semibold tracking-tight text-white hover:text-neutral-200 transition-colors"
        >
          JY Zhao
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => scrollToHash(item.href, event)}
              className="text-sm text-neutral-300 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={site.hero.secondaryCta.href}
          className="rounded-full border border-[#fb923c]/60 bg-[#fb923c] px-4 py-2 text-xs font-medium text-[#1b1205] transition-colors hover:bg-[#fdba74]"
        >
          Resume
        </a>
      </Container>
    </motion.header>
  );
}

