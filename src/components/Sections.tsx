import About from "@/sections/About";
import Collaborations from "@/sections/Collaborations";
import Contact from "@/sections/Contact";
import Education from "@/sections/Education";
import Experience from "@/sections/Experience";
import PersonalProjects from "@/sections/PersonalProjects";
import Services from "@/sections/Services";
import Skills from "@/sections/Skills";

export default function Sections() {
  return (
    <>
      <About />
      <Experience />
      <Skills />
      <Services />
      <PersonalProjects />
      <Collaborations />
      <Education />
      <Contact />
    </>
  );
}
