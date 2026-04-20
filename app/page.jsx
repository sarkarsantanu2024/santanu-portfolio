"use client";

import siteData from "@/data/siteData.json";
import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import About from "@/components/About.jsx";
import Skills from "@/components/Skills.jsx";
import Experience from "@/components/Experience.jsx";
import Projects from "@/components/Projects.jsx";
import Contact from "@/components/Contact.jsx";
import Footer from "@/components/Footer.jsx";
import BackToTop from "@/components/ui/BackToTop.jsx";

export default function Home() {
  return (
    <>
      <Navbar nav={siteData.nav} />
      <main className="bg-paper dark:bg-ink">
        <Hero hero={siteData.hero} />
        <About about={siteData.about} />
        <Skills skills={siteData.skills} />
        <Experience experience={siteData.experience} />
        <Projects projects={siteData.projects} />
        <Contact contact={siteData.contact} />
      </main>
      <Footer footer={siteData.footer} />
      <BackToTop />
    </>
  );
}
