/**
 * Collaborations shown in the "Collaborations" section.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO ADD A NEW COLLABORATION
 * ─────────────────────────────────────────────────────────────────
 *
 *   1. Copy any entry below (the whole `{ slug: ..., }` block).
 *   2. Paste it inside the COLLABORATIONS array.
 *   3. Edit the fields:
 *        slug    — unique kebab-case id (used as React key)
 *        image   — path under /public (use "/placeholder.svg" if none yet)
 *        link    — external URL where the collaboration lives (optional)
 *        date    — display date or range ("2024", "2022 — 2023", etc.)
 *        content — title, description, role per locale (en/es)
 *   4. Save. The card appears automatically.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO REMOVE A COLLABORATION
 * ─────────────────────────────────────────────────────────────────
 *
 *   Delete its entry from the COLLABORATIONS array. Done.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO REORDER
 * ─────────────────────────────────────────────────────────────────
 *
 *   Move entries up/down in the array — display order matches.
 *
 * ─────────────────────────────────────────────────────────────────
 *  TIPS
 * ─────────────────────────────────────────────────────────────────
 *
 *   - Use real screenshots in /public/collaborations/ for best look.
 *   - The `role` field shows your role in the collaboration
 *     (e.g. "Frontend Developer", "Contributor", "Tech Writer").
 *   - `link` is optional — omit if there's no public URL to share.
 *   - The placeholders below have generic URLs — replace before shipping.
 */

export type CollaborationLocaleContent = {
  title: string;
  description: string;
  role: string;
};

export type Collaboration = {
  slug: string;
  image: string;
  link?: string;
  date: string;
  content: {
    en: CollaborationLocaleContent;
    es: CollaborationLocaleContent;
  };
};

export const COLLABORATIONS: Collaboration[] = [
  // ──── Placeholder — replace with a real collaboration ────
  {
    slug: "open-source",
    image: "/placeholder.svg",
    link: "https://github.com/open-source-library/react-components",
    date: "2022",
    content: {
      en: {
        title: "React Component Library",
        description:
          "Contributions to an open-source library of reusable React components.",
        role: "Frontend Developer",
      },
      es: {
        title: "Librería React",
        description:
          "Contribuciones a una librería open-source de componentes React reusables.",
        role: "Frontend Developer",
      },
    },
  },

  // ──── Placeholder — replace with a real collaboration ────
  {
    slug: "hackathon",
    image: "/placeholder.svg",
    link: "https://devpost.com/software/community-engagement-app",
    date: "2021",
    content: {
      en: {
        title: "Community Engagement App",
        description:
          "Hackathon project to boost citizen participation in local initiatives.",
        role: "Full Stack Developer",
      },
      es: {
        title: "App Participación Ciudadana",
        description:
          "Proyecto de hackathon para impulsar la participación ciudadana local.",
        role: "Full Stack Developer",
      },
    },
  },

  // ──── Placeholder — replace with a real collaboration ────
  {
    slug: "blog",
    image: "/placeholder.svg",
    link: "https://tech-blog-example.com/authors/itsjhonalex",
    date: "2020 — Present",
    content: {
      en: {
        title: "Collaborative Technical Blog",
        description:
          "Articles on modern web development, architecture, and best practices.",
        role: "Technical Writer",
      },
      es: {
        title: "Blog Técnico Colaborativo",
        description:
          "Artículos sobre desarrollo web moderno, arquitectura y buenas prácticas.",
        role: "Technical Writer",
      },
    },
  },
];
