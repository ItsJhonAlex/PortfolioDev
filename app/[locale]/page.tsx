import { useTranslations } from 'next-intl';
import About from './components/About';
import Collaborations from './components/Collaborations';
import Contact from './components/Contact';
import Education from './components/Education';
import Experience from './components/Experience';
import FloatingNav from './components/floating-nav';
import Hero from './components/Hero';
import PersonalProjects from './components/PersonalProjects';
import Services from './components/Services';
import Skills from './components/Skills';

export default function Home() {
  const t = useTranslations();
  
  return (
    <main className="min-h-screen bg-background">
      <FloatingNav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Services />
      <PersonalProjects />
      <Collaborations />
      <Education />
      <Contact />
    </main>
  );
}
