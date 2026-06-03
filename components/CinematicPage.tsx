"use client";

import { useCallback, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { properties } from "@/data/properties";
import { Preloader } from "./Preloader";
import { ScrollProgress } from "./ScrollProgress";
import { ClientOnly3D } from "./ClientOnly3D";
import { HeroVideoScene } from "./HeroVideoScene";
import { AboutSection } from "./AboutSection";
import { WhyUsSection } from "./WhyUsSection";
import { ServicesSection } from "./ServicesSection";
import { PropertyScene } from "./PropertyScene";
import { BlogsSection } from "./BlogsSection";
import { CTASection } from "./CTASection";
import { ContactSection } from "./ContactSection";
import { FooterSection } from "./FooterSection";

export function CinematicPage() {
  const [ready, setReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Collect all video sources for caching in preloader
  const videoSources = useMemo(
    () => ["/videos/home-5.mp4", ...properties.map((property) => property.video)],
    []
  );

  const handlePreloaderComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-bone font-sans overflow-x-hidden">
      {/* 1. Cinematic Preloader */}
      <Preloader sources={videoSources} onComplete={handlePreloaderComplete} />

      {/* 2. Global Noise overlay for film grain aesthetic */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 3. Global Scroll Progress side bar */}
      <ScrollProgress />

      {/* 4. Background WebGL 3D Canvas */}
      <ClientOnly3D active={ready} />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-ink/97 backdrop-blur-3xl px-8 py-28 overflow-y-auto transition-all duration-[750ms] ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden ${
          mobileMenuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-8 text-2xl font-bold uppercase tracking-[0.24em] text-bone/90 mt-10">
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:text-champagne transition-all duration-500 ease-out transform ${
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
            href="#about"
          >
            Philosophy
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:text-champagne transition-all duration-500 ease-out transform ${
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
            href="#services"
          >
            Services
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:text-champagne transition-all duration-500 ease-out transform ${
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "250ms" }}
            href="#properties"
          >
            Residences
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className={`hover:text-champagne transition-all duration-500 ease-out transform ${
              mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "300ms" }}
            href="#journal"
          >
            Journal
          </a>
        </nav>
        
        <div
          className={`mt-auto border-t border-bone/10 pt-8 transition-all duration-500 ease-out transform ${
            mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          <div className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne/82 font-bold mb-2">
            LINEA HQ
          </div>
          <div className="text-xs uppercase tracking-widest text-bone/50">
            34.0194° N, 118.4912° W
          </div>
        </div>
      </div>

      {/* 5. Luxury Header Navigation */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full bg-ink/75 backdrop-blur-md">
        <nav
          className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-16 md:py-6 text-bone/90"
          aria-label="Main Navigation"
        >
          <a
            href="#"
            className="focus-ring luxury-heading text-2xl sm:text-3xl font-bold tracking-[0.2em] uppercase hover:text-champagne transition-colors duration-300"
          >
            LINEA
          </a>

          <div className="hidden items-center gap-16 text-sm font-bold uppercase tracking-[0.36em] text-bone/75 md:flex">
            <a className="focus-ring transition-colors hover:text-champagne duration-300" href="#about">
              Philosophy
            </a>
            <a className="focus-ring transition-colors hover:text-champagne duration-300" href="#services">
              Services
            </a>
            <a className="focus-ring transition-colors hover:text-champagne duration-300" href="#properties">
              Residences
            </a>
            <a className="focus-ring transition-colors hover:text-champagne duration-300" href="#journal">
              Journal
            </a>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="focus-ring inline-flex h-10 px-6 md:h-12 md:px-10 items-center justify-center border border-bone bg-bone text-[0.7rem] md:text-xs font-bold uppercase tracking-[0.26em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-bone"
            >
              Inquire
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="focus-ring flex h-10 w-10 items-center justify-center border border-bone/20 text-bone hover:border-bone transition-colors duration-300 md:hidden"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* 6. Main Scroll Timeline Journey */}
      <main>
        {/* Scene 01: Hero Intro (Building) */}
        <HeroVideoScene />

        {/* Scene 02: About (Philosophy) */}
        <AboutSection />

        {/* Scene 03: Why Us (The Pillars) */}
        <WhyUsSection />

        {/* Scene 04: Services (Scope of Work) */}
        <ServicesSection />

        {/* Anchor point for Residences / Projects */}
        <div id="properties" className="h-px w-full bg-transparent" />

        {/* Scene 05: Pinned Property Scenes (Projects Collections) */}
        {properties.map((property, index) => (
          <PropertyScene key={property.id} property={property} index={index} />
        ))}

        {/* Scene 06: Journal (Blogs/Insights) */}
        <BlogsSection />

        {/* Scene 07: CTA (Transitions) */}
        <CTASection />

        {/* Scene 08: Private Viewings Form (Contact) */}
        <ContactSection />
      </main>

      {/* 7. Footer (Global Coordinates & newsletter) */}
      <FooterSection />
    </div>
  );
}
