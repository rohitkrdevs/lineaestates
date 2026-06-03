"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const text = textRef.current;
      const line = lineRef.current;
      const svg = svgRef.current;
      if (!text || !line) return;

      const words = text.innerText.split(" ");
      text.innerHTML = words
        .map((word) => `<span class="about-word inline-block mr-2.5 opacity-15 transition-opacity duration-200">${word}</span>`)
        .join("");

      const spans = text.querySelectorAll(".about-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 76%",
          end: "bottom 78%",
          scrub: 1.2,
        }
      });

      tl.to(spans, {
        opacity: 0.95,
        stagger: 0.04,
        ease: "power1.out"
      }, 0);

      tl.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, ease: "power2.out" },
        0
      );

      // SVG Scroll parallax
      if (svg) {
        gsap.fromTo(
          svg,
          { rotation: -40, scale: 0.85, yPercent: 10 },
          {
            rotation: 50,
            scale: 1.05,
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative isolate flex min-h-[90vh] items-center bg-ink px-5 py-32 sm:px-8 md:px-12"
      aria-label="About Us"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bone/[0.01] to-transparent pointer-events-none" />

      {/* Scroll-animated Solar Chart background SVG */}
      <svg
        ref={svgRef}
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 z-0 opacity-[0.06] w-[min(38rem,85vw)] h-auto text-bone pointer-events-none select-none will-transform"
        viewBox="0 0 400 400"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="180" strokeDasharray="3 3" />
        <circle cx="200" cy="200" r="140" />
        <circle cx="200" cy="200" r="100" strokeDasharray="8 4" />
        <line x1="200" y1="10" x2="200" y2="390" />
        <line x1="10" y1="200" x2="390" y2="200" />
        <line x1="65" y1="65" x2="335" y2="335" strokeDasharray="4 6" />
        <line x1="335" y1="65" x2="65" y2="335" strokeDasharray="4 6" />
        <rect x="130" y="130" width="140" height="140" rx="4" />
        <rect x="155" y="155" width="90" height="90" rx="2" strokeDasharray="6 3" />
        <path d="M200 40 L204 200 L200 196 L196 200 Z" fill="currentColor" opacity="0.45" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-champagne/82">
            The Philosophy
          </p>
          <div ref={lineRef} className="h-px w-24 bg-champagne/40 origin-left mb-10 will-transform" />
          <p
            ref={textRef}
            className="luxury-heading text-balance text-2xl font-semibold leading-relaxed text-bone sm:text-3xl sm:leading-relaxed md:text-4xl md:leading-[1.75]"
          >
            We believe that architecture is not merely structure, but a vessel for light and silence. Linea Estates curates exceptional living volumes for those who appreciate the poetry of raw concrete, the warmth of natural limestone, and the quiet luxury of infinite horizons. Every site is hand-selected, and every space is crafted to elevate human experience.
          </p>
        </div>
      </div>
    </section>
  );
}
