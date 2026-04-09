import { Container } from "@/components/ui/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-neutral-950 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#fb923c]">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-5">
          <a
            className="text-sm text-[#fb923c]/80 hover:text-[#fb923c] transition-colors"
            href={`mailto:${site.contact.email}`}
          >
            Email
          </a>
          <a
            className="text-sm text-[#fb923c]/80 hover:text-[#fb923c] transition-colors"
            href={site.contact.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
          <a
            className="text-sm text-[#fb923c]/80 hover:text-[#fb923c] transition-colors"
            href={site.contact.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}

