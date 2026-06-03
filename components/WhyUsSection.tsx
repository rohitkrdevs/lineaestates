"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const pillars = [
  {
    num: "01",
    title: "Architectural Scenography",
    desc: "We curate spaces using natural materials that record the passage of time—honed travertine, raw board-formed concrete, and solid dark oak.",
    sub: "Sourced Materiality"
  },
  {
    num: "02",
    title: "Solar Orientation",
    desc: "Geometries are mathematically aligned to capture structural light play, creating moving shadows and rich amber glows at sunset.",
    sub: "Choreographed Light"
  },
  {
    num: "03",
    title: "Unlisted Seclusion",
    desc: "Our estates occupy prime geological coordinates, hidden in silent locations and secured through private acquisitions without public listing.",
    sub: "Absolute Discretion"
  }
];

export function WhyUsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      const header = headerRef.current;
      if (!grid || !header) return;

      const cards = grid.querySelectorAll(".why-card");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 74%",
          end: "bottom 84%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(
        header,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
      );

      tl.fromTo(
        cards,
        { opacity: 0, y: 44, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.16,
          ease: "power4.out"
        },
        "-=0.6"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="why-us"
      className="relative isolate bg-ink px-5 py-32 sm:px-8 md:px-12 border-t border-bone/5"
      aria-label="Why Linea Estates"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 will-transform">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-champagne/82">
            The Standard
          </p>
          <h2 className="luxury-heading text-balance text-5xl font-bold leading-tight text-bone sm:text-6xl md:text-7xl">
            Why Linea.
          </h2>
        </div>

        {/* Pillars Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="why-card glass-card group rounded-3xl p-8 transition-colors duration-500 hover:border-champagne/25 will-transform"
            >
              <div className="flex items-center justify-between">
                <span className="luxury-heading text-xs font-bold uppercase tracking-[0.3em] text-champagne/80">
                  {pillar.sub}
                </span>
                <span className="luxury-heading text-3xl font-bold text-bone/15 select-none">
                  {pillar.num}
                </span>
              </div>
              <h3 className="luxury-heading mt-10 text-3xl font-bold text-bone group-hover:text-champagne transition-colors duration-300">
                {pillar.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-bone/68">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
