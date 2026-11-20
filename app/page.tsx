import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Achievements from "@/components/sections/Achievements";
import Education from "@/components/sections/Education";
import Hobbies from "@/components/sections/Hobbies";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

// Urutan section sesuai brief: Hero, About, Skills, Projects, Certifications,
// Achievements, Education, Hobbies, Contact, Footer.
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="konten" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Achievements />
        <Education />
        <Hobbies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
