## Premium Personal Portfolio (Next.js 14)

Modern personal portfolio built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. The UI is minimal, neutral (black/white/gray), recruiter-friendly, and content-driven for easy maintenance.

### Tech

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

### Folder structure (important parts)

```
src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    Footer.tsx
    Navbar.tsx
    sections/
      AboutSection.tsx
      ContactSection.tsx
      EducationSection.tsx
      ExperienceSection.tsx
      HeroSection.tsx
      ProjectsSection.tsx
      SkillsSection.tsx
    ui/
      Badge.tsx
      Button.tsx
      Card.tsx
      Container.tsx
      Reveal.tsx
      SectionHeading.tsx
  content/
    site.ts
  lib/
    utils.ts
```

### Edit content

Update all portfolio text/links in:

- `src/content/site.ts`

### Resume download

Place your resume at:

- `public/resume.pdf`

The “Download Resume” button links to `/resume.pdf`.

## Run locally

Install dependencies, then start the dev server:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy (Vercel)

- Push to GitHub
- Import the repo in Vercel
- Deploy (defaults work)
