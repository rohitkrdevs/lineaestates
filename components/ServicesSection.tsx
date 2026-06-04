"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    num: "01",
    name: "Acquisition Curation",
    desc: "Private representation for securing rare, off-market real estate assets. We handle the entire procurement journey with absolute confidentiality.",
    details: ["Off-Market Sourcing", "Strict Confidentiality", "Geological Research"]
  },
  {
    num: "02",
    name: "Architectural Advisory",
    desc: "Collaborating with renowned modernist architects to translate raw spaces into personal art galleries, solar-aligned living volumes, and sound-insulated sanctuaries.",
    details: ["Consultancy Partnerships", "Acoustics & Lighting", "Site Planning"]
  },
  {
    num: "03",
    name: "Material Scenography",
    desc: "Sourcing and curating spatial materials—rare stone blocks, board-formed concrete finishes, custom metal framing, and bespoke wood finishes that tell a quiet story.",
    details: ["Stone Slab Selection", "Concrete Textures", "Bespoke Joinery"]
  },
  {
    num: "04",
    name: "Private Portfolios",
    desc: "Ongoing design maintenance and property management for clients holding global estates, ensuring architectural integrity across all residences.",
    details: ["Portfolio Maintenance", "Structural Audits", "Asset Supervision"]
  }
];

export function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      const svg = svgRef.current;
      if (!container || !leftCol || !rightCol) return;

      const items = rightCol.querySelectorAll(".service-item");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Pin the left column description while scrolling the right column list ONLY on desktop (min-width: 1024px)
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        ScrollTrigger.create({
          trigger: container,
          start: "top 12%",
          end: "bottom 92%",
          pin: leftCol,
          pinSpacing: false
        });
      }

      // Highlight active service item in viewport center
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.35, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            scrollTrigger: {
              trigger: item,
              start: "top 76%",
              end: "bottom 48%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // SVG Scroll parallax
      if (svg) {
        gsap.fromTo(
          svg,
          { rotation: 15, yPercent: 25, scale: 0.88 },
          {
            rotation: -30,
            yPercent: -20,
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: container,
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
      id="services"
      className="relative isolate bg-transparent px-5 py-32 sm:px-8 md:px-12 border-t border-bone/5 overflow-hidden"
      aria-label="Services Portfolio"
    >
      {/* Background animated SVG wireframe */}
      <svg
        ref={svgRef}
        className="absolute left-[-8%] top-1/4 z-0 opacity-[0.045] w-[min(34rem,78vw)] h-auto text-bone pointer-events-none select-none will-transform"
        viewBox="0 0 300 300"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.75"
        aria-hidden="true"
      >
        <rect x="50" y="50" width="200" height="200" rx="6" />
        <rect x="75" y="75" width="150" height="150" rx="4" strokeDasharray="4 4" />
        <path d="M150 60 L240 110 L240 210 L150 260 L60 210 L60 110 Z" />
        <path d="M150 60 L150 260" />
        <path d="M60 110 L150 160 L240 110" />
        <line x1="45" y1="210" x2="45" y2="110" />
        <line x1="40" y1="210" x2="50" y2="210" />
        <line x1="40" y1="110" x2="50" y2="110" />
      </svg>

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        
        {/* Pinned Left Column */}
        <div ref={leftColRef} className="h-fit will-transform lg:pr-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-champagne/82">
            The Scope
          </p>
          <h2 className="luxury-heading text-balance text-5xl font-bold leading-tight text-bone sm:text-6xl md:text-7xl">
            Our Services
          </h2>
          <p className="mt-6 max-w-sm text-base leading-7 text-bone/68">
            From initial off-market search to precise material curation, we guide collectors of design through every phase of building their legacy.
          </p>
        </div>

        {/* Right Scroll Column */}
        <div ref={rightColRef} className="flex flex-col gap-10 lg:gap-14">
          {services.map((service, i) => (
            <div
              key={i}
              className="service-item glass-card rounded-3xl p-8 transition-all duration-300 will-transform"
            >
              <div className="flex items-start justify-between">
                <span className="luxury-heading text-2xl font-bold text-champagne">
                  {service.num}
                </span>
                <h3 className="luxury-heading text-3xl font-bold text-bone sm:text-4xl">
                  {service.name}
                </h3>
              </div>
              <p className="mt-5 text-base leading-7 text-bone/70 max-w-2xl">
                {service.desc}
              </p>
              
              <div className="mt-8 flex flex-wrap gap-2.5">
                {service.details.map((detail, idx) => (
                  <span
                    key={idx}
                    className="border border-bone/10 bg-bone/[0.03] px-4 py-1.5 text-xs uppercase tracking-widest text-bone/58"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
