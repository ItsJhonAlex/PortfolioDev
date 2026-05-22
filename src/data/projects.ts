/**
 * Personal projects shown in the "Personal Projects" section.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO ADD A NEW PROJECT
 * ─────────────────────────────────────────────────────────────────
 *
 *   1. Copy any entry below (the whole `{ slug: ..., }` block).
 *   2. Paste it inside the PROJECTS array.
 *   3. Edit the fields:
 *        slug      — unique kebab-case id (used as React key)
 *        image     — path under /public (e.g. "/projects/foo.png")
 *                    Use "/placeholder.svg" if you don't have a screenshot yet.
 *        github    — full GitHub URL (optional — omit the field if none)
 *        live      — full live demo URL (optional)
 *        tags      — array of lowercase tech names (3–5 looks best)
 *        year      — display year (optional, shown in top-right badge)
 *        content   — title + description per locale (en/es)
 *   4. Save the file. The new card appears automatically.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO REMOVE A PROJECT
 * ─────────────────────────────────────────────────────────────────
 *
 *   Just delete its entry from the PROJECTS array. Done.
 *
 * ─────────────────────────────────────────────────────────────────
 *  HOW TO REORDER
 * ─────────────────────────────────────────────────────────────────
 *
 *   Move the entries up or down in the array — display order matches.
 *
 * ─────────────────────────────────────────────────────────────────
 *  TIPS
 * ─────────────────────────────────────────────────────────────────
 *
 *   - For real project screenshots, drop them in /public/projects/
 *     at ~800×600 (4:3 aspect ratio works best in the polaroid).
 *   - `github` and `live` are independent. Either, both, or none.
 *   - Tags appear as small chips; use lowercase ("react" not "React").
 *   - The placeholders below have URLs pointing to "yourusername" —
 *     when you replace them with real projects, update the URLs too.
 */

export type ProjectLocaleContent = {
  title: string;
  description: string;
};

export type Project = {
  slug: string;
  image: string;
  github?: string;
  live?: string;
  tags: string[];
  year?: string;
  content: {
    en: ProjectLocaleContent;
    es: ProjectLocaleContent;
  };
};

export const PROJECTS: Project[] = [
  // ──── Placeholder — replace with a real project ────
  {
    slug: "ecommerce",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/ecommerce-platform",
    live: "https://ecommerce-platform-demo.vercel.app",
    tags: ["react", "node", "mongo", "stripe"],
    year: "2024",
    content: {
      en: {
        title: "E-commerce Platform",
        description:
          "Full-stack store with shopping cart, payment gateway, and admin panel.",
      },
      es: {
        title: "Plataforma E-commerce",
        description:
          "Tienda full-stack con carrito, pasarela de pago y panel admin.",
      },
    },
  },

  // ──── Placeholder — replace with a real project ────
  {
    slug: "task-manager",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/task-management-app",
    live: "https://task-app-demo.vercel.app",
    tags: ["next", "react-query", "tailwind"],
    year: "2024",
    content: {
      en: {
        title: "Task Manager App",
        description:
          "Project and task management with real-time team collaboration.",
      },
      es: {
        title: "Gestor de Tareas",
        description:
          "Gestión de proyectos y tareas con colaboración en tiempo real.",
      },
    },
  },

  // ──── Placeholder — replace with a real project ────
  {
    slug: "weather-dashboard",
    image: "/placeholder.svg",
    github: "https://github.com/yourusername/weather-dashboard",
    live: "https://weather-dashboard-demo.vercel.app",
    tags: ["react", "openweather", "chart.js"],
    year: "2023",
    content: {
      en: {
        title: "Weather Dashboard",
        description:
          "Real-time weather visualizations with interactive multi-city support.",
      },
      es: {
        title: "Dashboard del Clima",
        description:
          "Visualizaciones de clima en tiempo real con soporte multi-ciudad.",
      },
    },
  },
];
