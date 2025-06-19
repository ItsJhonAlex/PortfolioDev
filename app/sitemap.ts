import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://itsjhonalex.is-a.dev'
  
  // Rutas principales en ambos idiomas
  const routes = [
    '',
    '/es',
    '/en'
  ]

  // Generar entradas del sitemap
  const sitemapEntries: MetadataRoute.Sitemap = routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' || route === '/es' || route === '/en' ? 1 : 0.8,
  }))

  // Agregar secciones específicas con anchors para mejor indexación
  const sections = [
    '#hero',
    '#about', 
    '#experience',
    '#skills',
    '#services',
    '#projects',
    '#collaborations',
    '#education',
    '#contact'
  ]

  // Agregar las secciones para cada idioma
  const languages: string[] = ['es', 'en']
  languages.forEach((lang: string) => {
    sections.forEach((section: string) => {
      sitemapEntries.push({
        url: `${baseUrl}/${lang}${section}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })
    })
  })

  return sitemapEntries
} 