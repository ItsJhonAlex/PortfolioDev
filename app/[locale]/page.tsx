import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Education from "./components/Education"
import Services from "./components/Services"
import PersonalProjects from "./components/PersonalProjects"
import Collaborations from "./components/Collaborations"
import Contact from "./components/Contact"
import FloatingNav from "./components/floating-nav"

export default function Home() {
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
  )
}
