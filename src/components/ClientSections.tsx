"use client"

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Componente simple de indicador de carga para Suspense
function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// Componentes cargados de forma perezosa más agresiva
const About = dynamic(() => import('@/sections/About'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})
const Experience = dynamic(() => import('@/sections/Experience'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})
const Skills = dynamic(() => import('@/sections/Skills'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})
const Services = dynamic(() => import('@/sections/Services'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})
const PersonalProjects = dynamic(() => import('@/sections/PersonalProjects'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})
const Collaborations = dynamic(() => import('@/sections/Collaborations'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})
const Education = dynamic(() => import('@/sections/Education'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})
const Contact = dynamic(() => import('@/sections/Contact'), { 
  ssr: false,
  loading: () => <LoadingIndicator />
})

export default function ClientSections() {
  return (
    <>
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
    </>
  )
} 