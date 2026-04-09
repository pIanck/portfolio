"use client";

import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs font-medium tracking-[0.2em] text-neutral-400">
        {label.toUpperCase()}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-white/20 focus:bg-white/10";

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 bg-[#0b1220] py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s connect"
            description="Reach out for roles in data analytics, supply chain analytics, business analytics, or rotational programs."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <Reveal className="lg:col-span-1">
            <Card className="h-full border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[#7c3a10] via-[#4a2c1c] to-[#1b2432] shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),0_20px_50px_rgba(0,0,0,0.35)]">
              <h3 className="text-base font-semibold text-white">Links</h3>
              <div className="mt-5 grid gap-3 text-sm">
                <a
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
                  href={`mailto:${site.contact.email}`}
                >
                  {site.contact.email}
                </a>
                <a
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
                  href={site.contact.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  LinkedIn
                </a>
                <a
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-neutral-200 hover:bg-white/10 hover:text-white transition-colors"
                  href={site.contact.github}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  GitHub
                </a>
              </div>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-2" delay={0.05}>
            <Card className="border-[rgba(249,115,22,0.2)] bg-gradient-to-br from-[#7c3a10] via-[#4a2c1c] to-[#1b2432] shadow-[inset_0_0_0_1px_rgba(249,115,22,0.12),0_20px_50px_rgba(0,0,0,0.35)]">
              <h3 className="text-base font-semibold text-white">Message</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-300">
                Frontend-only form UI (wire to your preferred email service or
                API later).
              </p>

              <form
                className="mt-6 grid gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name">
                    <input
                      className={inputClasses}
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      className={inputClasses}
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                    />
                  </Field>
                </div>
                <Field label="Subject">
                  <input
                    className={inputClasses}
                    placeholder="Analytics role / collaboration"
                  />
                </Field>
                <Field label="Message">
                  <textarea
                    className="min-h-32 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none transition focus:border-white/20 focus:bg-white/10"
                    placeholder="Write a brief message..."
                  />
                </Field>
                <button
                  className="mt-1 inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
                  type="submit"
                >
                  Send message
                </button>
              </form>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

