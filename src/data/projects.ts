import type { Locale } from '../i18n/utils';

export type Project = {
  num: string;
  stack: string[];
  banner: string;
  live: string;
  repo: string;
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
    stack: ['React', 'Node', 'PostgreSQL'],
    banner: 'linear-gradient(135deg,rgba(124,92,255,.34),rgba(167,139,250,.10))',
    live: '#',
    repo: 'https://github.com/ItsJhonAlex',
  },
  {
    num: '02',
    stack: ['Rust', 'Solana', 'Web3'],
    banner: 'linear-gradient(135deg,rgba(99,102,241,.30),rgba(124,92,255,.08))',
    live: '#',
    repo: 'https://github.com/ItsJhonAlex',
  },
  {
    num: '03',
    stack: ['Flutter', 'Spring', 'IA'],
    banner: 'linear-gradient(135deg,rgba(167,139,250,.30),rgba(99,102,241,.08))',
    live: '#',
    repo: 'https://github.com/ItsJhonAlex',
  },
];

export const projectsCopy: Record<Locale, ProjectCopy[]> = {
  es: [
    {
      cat: 'Plataforma web',
      title: 'Nombre del proyecto',
      year: '2025',
      role: 'Full-Stack · Diseño & Desarrollo',
      overview: 'Una descripción completa del proyecto: el problema que resolviste, tu rol, las decisiones técnicas clave y el resultado obtenido. Sustituye este texto por tu caso real.',
    },
    {
      cat: 'Aplicación Web3',
      title: 'Nombre del proyecto',
      year: '2025',
      role: 'Smart Contracts · Frontend',
      overview: 'Una descripción completa del proyecto: el problema que resolviste, tu rol, las decisiones técnicas clave y el resultado obtenido. Sustituye este texto por tu caso real.',
    },
    {
      cat: 'App multiplataforma',
      title: 'Nombre del proyecto',
      year: '2024',
      role: 'Full-Stack · Móvil',
      overview: 'Una descripción completa del proyecto: el problema que resolviste, tu rol, las decisiones técnicas clave y el resultado obtenido. Sustituye este texto por tu caso real.',
    },
  ],
  en: [
    {
      cat: 'Web platform',
      title: 'Project name',
      year: '2025',
      role: 'Full-Stack · Design & Development',
      overview: 'A complete description of the project: the problem you solved, your role, the key technical decisions and the outcome. Replace this text with your real case.',
    },
    {
      cat: 'Web3 app',
      title: 'Project name',
      year: '2025',
      role: 'Smart Contracts · Frontend',
      overview: 'A complete description of the project: the problem you solved, your role, the key technical decisions and the outcome. Replace this text with your real case.',
    },
    {
      cat: 'Cross-platform app',
      title: 'Project name',
      year: '2024',
      role: 'Full-Stack · Mobile',
      overview: 'A complete description of the project: the problem you solved, your role, the key technical decisions and the outcome. Replace this text with your real case.',
    },
  ],
};
