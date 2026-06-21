import type { Locale } from './utils';

const it = "font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;color:var(--accent2);";
const grad = "font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;background:linear-gradient(100deg,var(--accent),var(--accent2));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;";

export const ui = {
  es: {
    'nav.work': 'trabajo', 'nav.stack': 'stack', 'nav.contact': 'contacto',
    'hero.badge': 'Disponible para proyectos · Habana, Cuba',
    'hero.tagline': `Desarrollador <span style="color:var(--text);">Full-Stack</span>. Del concepto al deploy: construyo productos digitales completos — interfaces que emocionan, backends que aguantan y código que da gusto mantener.`,
    'hero.cta1': 'Ver mi trabajo', 'hero.cta2': 'Hablemos', 'hero.cv': 'Descargar CV',
    'about.label': '( SOBRE MÍ )',
    'about.body': `Construyo software <span style="${it}">de extremo a extremo</span> — desde la primera línea de diseño hasta el deploy en producción. Me obsesiona el detalle, la fluidez de cada interacción y dejar un código <span style="${it}">limpio</span> del que pueda enorgullecerme.`,
    'stack.title': 'Stack & herramientas', 'stack.sub': '/ 06 dominios',
    'stack.l1': '01 — LENGUAJES', 'stack.l2': '02 — FRONTEND', 'stack.l3': '03 — BACKEND', 'stack.l4': '04 — WEB3', 'stack.l5': '05 — DEVOPS & TOOLS', 'stack.l6': '06 — IA & DATA',
    'stack.cAi': 'IA & Automatización', 'stack.cData': 'Análisis de datos', 'stack.cQa': 'Testing & QA',
    'projects.title': 'Trabajo seleccionado', 'projects.sub': '/ reemplaza con tus proyectos', 'projects.name': 'Nombre del proyecto', 'projects.desc': 'Describe en una línea qué resolviste y el impacto. Edita este texto con tu caso real.',
    'contact.label': '( HABLEMOS )',
    'contact.title': `¿Tienes una <span style="${grad}">idea</span>?`,
    'contact.body': 'Estoy disponible para nuevos proyectos. Escríbeme y construimos algo que valga la pena.',
    'modal.year': 'Año', 'modal.role': 'Rol', 'modal.overview': 'Resumen', 'modal.stack': 'Stack', 'modal.live': 'Ver en vivo', 'modal.repo': 'Código', 'modal.close': 'Cerrar',
    'footer.right': 'Habana, Cuba · Full-Stack Developer',
  },
  en: {
    'nav.work': 'work', 'nav.stack': 'stack', 'nav.contact': 'contact',
    'hero.badge': 'Available for projects · Havana, Cuba',
    'hero.tagline': `<span style="color:var(--text);">Full-Stack</span> developer. From concept to deploy: I build complete digital products — interfaces that move people, backends that hold up, and code that's a pleasure to maintain.`,
    'hero.cta1': 'View my work', 'hero.cta2': "Let's talk", 'hero.cv': 'Download CV',
    'about.label': '( ABOUT )',
    'about.body': `I build software <span style="${it}">end to end</span> — from the first line of design to the production deploy. I'm obsessed with detail, the fluidity of every interaction, and leaving <span style="${it}">clean</span> code I can be proud of.`,
    'stack.title': 'Stack & tools', 'stack.sub': '/ 06 domains',
    'stack.l1': '01 — LANGUAGES', 'stack.l2': '02 — FRONTEND', 'stack.l3': '03 — BACKEND', 'stack.l4': '04 — WEB3', 'stack.l5': '05 — DEVOPS & TOOLS', 'stack.l6': '06 — AI & DATA',
    'stack.cAi': 'AI & Automation', 'stack.cData': 'Data analysis', 'stack.cQa': 'Testing & QA',
    'projects.title': 'Selected work', 'projects.sub': '/ replace with your projects', 'projects.name': 'Project name', 'projects.desc': 'Describe in one line what you solved and the impact. Edit this text with your real case.',
    'contact.label': "( LET'S TALK )",
    'contact.title': `Got an <span style="${grad}">idea</span>?`,
    'contact.body': "I'm available for new projects. Write to me and let's build something worthwhile.",
    'modal.year': 'Year', 'modal.role': 'Role', 'modal.overview': 'Overview', 'modal.stack': 'Stack', 'modal.live': 'View live', 'modal.repo': 'Code', 'modal.close': 'Close',
    'footer.right': 'Havana, Cuba · Full-Stack Developer',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['es'];

export function useTranslations(lang: Locale) {
  return (key: UIKey): string => ui[lang][key] ?? ui.es[key] ?? String(key);
}
