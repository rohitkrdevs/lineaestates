"use client";

import { useCallback, useMemo, useState } from "react";
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

  // Collect all video sources for caching in preloader
  const videoSources = useMemo(
    () => ["/videos/building.mp4", ...properties.map((property) => property.video)],
    []
  );

  const handlePreloaderComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-ink text-bone font-sans">
      {/* 1. Cinematic Preloader */}
      <Preloader sources={videoSources} onComplete={handlePreloaderComplete} />

      {/* 2. Global Noise overlay for film grain aesthetic */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* 3. Global Scroll Progress side bar */}
      <ScrollProgress />

      {/* 4. Background WebGL 3D Canvas */}
      <ClientOnly3D active={ready} />

      {/* 5. Luxury Header Navigation */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 w-full bg-ink/75 backdrop-blur-md">
        <nav
          className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between px-8 py-5 md:px-16 md:py-6 text-bone/90"
          aria-label="Main Navigation"
        >
          <a
            href="#"
            className="focus-ring luxury-heading text-3xl font-bold tracking-[0.2em] uppercase hover:text-champagne transition-colors duration-300"
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

          <div className="flex items-center">
            <a
              href="#contact"
              className="focus-ring inline-flex h-12 w-48 items-center justify-center border border-bone bg-bone text-xs font-bold uppercase tracking-[0.26em] text-ink transition-colors duration-300 hover:bg-transparent hover:text-bone"
            >
              Inquire
            </a>
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
