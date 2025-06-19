import dynamic from 'next/dynamic'
import Hero from "./components/Hero"
import FloatingNav from "./components/floating-nav"
import StructuredData from "./components/StructuredData"
import { Suspense } from 'react'
import { getTranslations } from 'next-intl/server'
// Eliminar esta importación que causa conflicto
// import LoadingIndicator from './components/LoadingIndicator'

// Componente simple de indicador de carga para Suspense
function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// Componentes cargados de forma perezosa
const About = dynamic(() => import('./components/About'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})
const Experience = dynamic(() => import('./components/Experience'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})
const Skills = dynamic(() => import('./components/Skills'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})
const Services = dynamic(() => import('./components/Services'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})
const PersonalProjects = dynamic(() => import('./components/PersonalProjects'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})
const Collaborations = dynamic(() => import('./components/Collaborations'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})
const Education = dynamic(() => import('./components/Education'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})
const Contact = dynamic(() => import('./components/Contact'), { 
  ssr: true,
  loading: () => <LoadingIndicator />
})

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
      <Suspense fallback={<LoadingIndicator />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <Services />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <PersonalProjects />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <Collaborations />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <Education />
      </Suspense>
      <Suspense fallback={<LoadingIndicator />}>
        <Contact />
      </Suspense>
    </main>
  )
}
