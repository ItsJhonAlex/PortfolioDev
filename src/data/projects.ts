import type { Locale } from '../i18n/utils';

export type Project = {
  num: string;
  stack: string[];
  banner: string;
  live?: string;
  repo?: string;
};

export type ProjectCopy = {
  cat: string;
  title: string;
  year: string;
  role: string;
  overview: string;
};

export const projectsBase: Project[] = [
  {
    num: '01',
    stack: ['Bun', 'Hono', 'bun:sqlite'],
    banner: 'linear-gradient(135deg,rgba(124,92,255,.34),rgba(167,139,250,.10))',
  },
  {
    num: '02',
    stack: ['Elixir', 'MCP'],
    banner: 'linear-gradient(135deg,rgba(99,102,241,.30),rgba(124,92,255,.08))',
  },
  {
    num: '03',
    stack: [],
    banner: 'linear-gradient(135deg,rgba(167,139,250,.30),rgba(99,102,241,.08))',
    repo: 'https://github.com/ItsJhonAlex/TatianaBot',
  },
  {
    num: '04',
    stack: ['Node', 'NestJS', 'Prisma', 'PostgreSQL'],
    banner: 'linear-gradient(135deg,rgba(109,63,255,.32),rgba(167,139,250,.10))',
    repo: 'https://github.com/ItsJhonAlex/tasks-api',
  },
  {
    num: '05',
    stack: ['Solidity'],
    banner: 'linear-gradient(135deg,rgba(139,92,246,.28),rgba(99,102,241,.12))',
  },
];

export const projectsCopy: Record<Locale, ProjectCopy[]> = {
  es: [
    {
      cat: 'Menú digital',
      title: 'DigitalMenu',
      year: 'Oct 2026',
      role: 'Full-Stack',
      overview:
        'Menú digital offline por WiFi para el restaurante Avanzar In Time en Cuba. Un único .exe (Bun, Hono y bun:sqlite) que funciona en PCs de punto de venta antiguos, sin AVX2 ni internet.',
    },
    {
      cat: 'ERP',
      title: 'GERP',
      year: 'Jun–Ago 2026',
      role: 'Freelance',
      overview:
        'ERP modular en Elixir para una empresa en crecimiento de España. Incluye un agente de IA que actúa dentro de los permisos del usuario y unas 40 acciones expuestas por MCP.',
    },
    {
      cat: 'Asistente de IA',
      title: 'Tatiana',
      year: 'Desde 2023',
      role: 'Proyecto personal',
      overview: 'Asistente de IA conectado a un ERP, más el bot público TatianaBot para Discord.',
    },
    {
      cat: 'Backend',
      title: 'tasks-api',
      year: 'Nov 2026',
      role: 'Backend',
      overview:
        'API de tareas en Node (NestJS, Prisma y PostgreSQL) con 21 tests y CI en GitHub Actions.',
    },
    {
      cat: 'Solidity',
      title: 'Staking y farming en Ethereum',
      year: '2022–2024',
      role: 'Freelance',
      overview:
        'Contratos de staking y farming en Solidity para un cliente de España, con buena seguridad y fees bajos.',
    },
  ],
  en: [
    {
      cat: 'Digital menu',
      title: 'DigitalMenu',
      year: 'Oct 2026',
      role: 'Full-Stack',
      overview:
        'Offline WiFi digital menu for the Avanzar In Time restaurant in Cuba. A single .exe (Bun, Hono, and bun:sqlite) that runs on old point-of-sale PCs without AVX2 or internet.',
    },
    {
      cat: 'ERP',
      title: 'GERP',
      year: 'Jun–Aug 2026',
      role: 'Freelance',
      overview:
        'Modular ERP in Elixir for a growing company in Spain. It includes an AI agent that acts within the user\'s permissions and about 40 actions exposed via MCP.',
    },
    {
      cat: 'AI assistant',
      title: 'Tatiana',
      year: 'Since 2023',
      role: 'Personal project',
      overview: 'AI assistant connected to an ERP, plus the public Discord bot TatianaBot.',
    },
    {
      cat: 'Backend',
      title: 'tasks-api',
      year: 'Nov 2026',
      role: 'Backend',
      overview:
        'Node tasks API (NestJS, Prisma, and PostgreSQL) with 21 tests and CI on GitHub Actions.',
    },
    {
      cat: 'Solidity',
      title: 'Ethereum staking and farming',
      year: '2022–2024',
      role: 'Freelance',
      overview:
        'Solidity staking and farming contracts for a client in Spain, with strong security and low fees.',
    },
  ],
};
