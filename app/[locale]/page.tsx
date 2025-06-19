import Hero from "./components/Hero"
import FloatingNav from "./components/floating-nav"
import StructuredData from "./components/StructuredData"
import ClientSections from "./components/ClientSections"
import { getTranslations } from 'next-intl/server'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations()
  
  return (
    <main className="min-h-screen bg-background">
      <StructuredData 
        locale={locale}
        heroDescription={t('hero.description')}
        heroRole={t('hero.role')}
        metadataDescription={t('metadata.description')}
      />
      <FloatingNav />
      <Hero />
      <ClientSections />
    </main>
  )
}
