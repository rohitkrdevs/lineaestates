"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Property } from "@/data/properties";
import { ScrollVideo } from "./ScrollVideo";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const COORDINATES: Record<string, string> = {
  "Malibu Hills": "34.0259° N, 118.7798° W",
  "Beverly Crest": "34.0980° N, 118.4233° W",
  "Palm Springs": "33.8303° N, 116.5453° W",
  "Manhattan West": "40.7533° N, 73.9996° W",
  "Montecito Coast": "34.4367° N, 119.6321° W"
};

type PropertySceneProps = {
  property: Property;
  index: number;
};

export function PropertyScene({ property, index }: PropertySceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const mask = maskRef.current;
      const videoWrapper = videoWrapperRef.current;
      const container = containerRef.current;
      const title = titleRef.current;
      const details = detailsRef.current;
      const number = numberRef.current;

      if (!section || !mask || !videoWrapper || !container || !title || !details || !number) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Pin the section while scrolling through the entrance and exit phases of the property scene
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=170%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1
        }
      });

      // 1. Reveal masks based on property specification
      if (property.reveal === "clip") {
        // Scene 02 (Property 1): Reveal from bottom
        tl.fromTo(
          mask,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
          0
        );
      } else if (property.reveal === "curtain") {
        // Scene 03 (Property 2): Side curtain reveal
        tl.fromTo(
          mask,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
          0
        );
      } else if (property.reveal === "stagger") {
        // Scene 04 (Property 3): Rounded rectangle mask expands
        tl.fromTo(
          mask,
          { clipPath: "inset(16% 20% 16% 20% round 32px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none" },
          0
        );
      } else if (property.reveal === "slide") {
        // Scene 05 (Property 4): Split-screen slide
        tl.fromTo(
          mask,
          { clipPath: "inset(0% 0% 0% 100%)" },
          { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
          0
        );
      } else {
        // Scene 06 (Property 5): Custom scale fade
        tl.fromTo(
          mask,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, ease: "none" },
          0
        );
      }

      // 2. Parallax scale on the background video (zooms out from 1.15 to 1)
      tl.fromTo(
        videoWrapper,
        { scale: 1.18 },
        { scale: 1.0, ease: "none" },
        0
      );

      // 3. UI element animations (Title slides up, number zooms, details card slides in)
      const side = index % 2 === 0 ? 1 : -1;
      
      tl.fromTo(
        title,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, ease: "power2.out" },
        0.18
      );

      tl.fromTo(
        number,
        { scale: 0.82, opacity: 0 },
        { scale: 1, opacity: 0.45, ease: "power2.out" },
        0.15
      );

      tl.fromTo(
        details,
        { x: side * 120, opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: "power3.out" },
        0.28
      );

      // 4. Subtle exit fade out/scale down towards the end of the section pin
      tl.to(
        [title, details, number],
        { opacity: 0, y: -40, ease: "none" },
        0.85
      );

      tl.to(
        mask,
        { opacity: 0.2, ease: "none" },
        0.88
      );
    },
    { dependencies: [index, property.reveal], scope: sectionRef }
  );

  const alignRight = index % 2 === 1;

  return (
    <section
      ref={sectionRef}
      className="section-shell relative isolate flex items-center overflow-hidden bg-ink"
      aria-labelledby={`property-${property.id}`}
    >
      {/* Mask container that dictates the transition reveal shape */}
      <div
        ref={maskRef}
        className="absolute inset-0 z-0 h-full w-full overflow-hidden will-transform"
      >
        {/* Wrapper to control background video scale/zoom separately from mask */}
        <div ref={videoWrapperRef} className="absolute inset-0 h-full w-full will-transform">
          <ScrollVideo src={property.video} parallax={false} overlay className="h-full w-full" />
        </div>
      </div>

      {/* Top Architectural SVG Divider */}
      <div className="absolute top-0 inset-x-0 z-20 h-14 w-full border-t border-bone/10 pointer-events-none select-none">
        <svg
          className="h-full w-full text-bone/20"
          viewBox="0 0 1920 56"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
        >
          <line x1="0" y1="28" x2="1920" y2="28" strokeWidth="2.5" />
          <path
            d="
              M 40,20 L 40,36
              M 140,24 L 140,32
              M 240,24 L 240,32
              M 340,24 L 340,32
              M 440,24 L 440,32
              M 540,24 L 540,32
              M 640,24 L 640,32
              M 740,24 L 740,32
              M 840,24 L 840,32
              M 960,14 L 960,42
              M 1080,24 L 1080,32
              M 1180,24 L 1180,32
              M 1280,24 L 1280,32
              M 1380,24 L 1380,32
              M 1480,24 L 1480,32
              M 1580,24 L 1580,32
              M 1680,24 L 1680,32
              M 1780,24 L 1780,32
              M 1880,20 L 1880,36
            "
            strokeWidth="2"
          />
          <circle cx="960" cy="28" r="8" strokeWidth="2" />
          <circle cx="960" cy="28" r="2" fill="currentColor" />
          <circle cx="40" cy="28" r="3" fill="currentColor" />
          <circle cx="1880" cy="28" r="3" fill="currentColor" />
        </svg>
        <div className="absolute inset-0 flex justify-between items-center px-6 md:px-10 text-xs font-bold uppercase tracking-[0.32em] text-champagne">
          <span className="backdrop-blur-[2px] px-2 py-0.5 bg-black/10 rounded">LINEA.SYS // ELEVATION_X_0{index + 1}</span>
          <span className="hidden sm:inline backdrop-blur-[2px] px-2 py-0.5 bg-black/10 rounded">SCENE_0{index + 1} // RDR_UNIT</span>
          <span className="backdrop-blur-[2px] px-2 py-0.5 bg-black/10 rounded">{COORDINATES[property.location] || "34.0259° N, 118.7798° W"}</span>
        </div>
      </div>

      {/* Bottom Architectural SVG Divider */}
      <div className="absolute bottom-0 inset-x-0 z-20 h-14 w-full border-b border-bone/10 pointer-events-none select-none">
        <svg
          className="h-full w-full text-bone/20"
          viewBox="0 0 1920 56"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
        >
          <line x1="0" y1="28" x2="1920" y2="28" strokeWidth="2.5" />
          <path
            d="
              M 40,20 L 40,36
              M 220,24 L 220,32
              M 400,24 L 400,32
              M 580,24 L 580,32
              M 760,24 L 760,32
              M 960,14 L 960,42
              M 1160,24 L 1160,32
              M 1340,24 L 1340,32
              M 1520,24 L 1520,32
              M 1700,24 L 1700,32
              M 1880,20 L 1880,36
            "
            strokeWidth="2"
          />
          <circle cx="960" cy="28" r="8" strokeWidth="2" />
          <line x1="945" y1="28" x2="975" y2="28" strokeWidth="2" />
          <line x1="960" y1="13" x2="960" y2="43" strokeWidth="2" />
        </svg>
        <div className="absolute inset-0 flex justify-between items-center px-6 md:px-10 text-xs font-bold uppercase tracking-[0.32em] text-champagne">
          <span className="backdrop-blur-[2px] px-2 py-0.5 bg-black/10 rounded">RESIDENCE_0{property.id} // SEC_RDR</span>
          <span className="hidden sm:inline backdrop-blur-[2px] px-2 py-0.5 bg-black/10 rounded">SCALE 1 : 250 // GRID_ALIGN</span>
          <span className="backdrop-blur-[2px] px-2 py-0.5 bg-black/10 rounded">MODEL_REF // {property.size}</span>
        </div>
      </div>

      {/* Main content grid */}
      <div
        ref={containerRef}
        className="relative z-30 mx-auto grid min-h-screen w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-5 py-28 sm:px-8 md:px-12 lg:grid-cols-[1.1fr_.9fr]"
      >
        {/* Title and ID columns */}
        <div className={alignRight ? "lg:order-2" : ""}>
          <div className="relative select-none">
            <div
              ref={numberRef}
              className="luxury-heading absolute -top-14 -left-4 text-[7.5rem] leading-[0] text-champagne/15 select-none will-transform md:-top-20 md:-left-8 md:text-[11.5rem]"
              aria-hidden="true"
            >
              {property.id}
            </div>
            <div className="mb-5 flex items-center gap-4 text-xs uppercase tracking-[0.34em] text-champagne/90">
              <span>Residence</span>
              <span className="h-px w-10 bg-bone/20" />
              <span>{property.location}</span>
            </div>
            <h2
              id={`property-${property.id}`}
              ref={titleRef}
              className="luxury-heading font-bold max-w-2xl text-balance text-[clamp(2.8rem,7vw,7.8rem)] leading-[0.88] text-white will-transform"
            >
              {property.title}
            </h2>
          </div>
        </div>

        {/* Floating Glass card for specs and CTAs */}
        <div className={`flex justify-center ${alignRight ? "lg:justify-start" : "lg:justify-end"}`}>
          <aside
            ref={detailsRef}
            className="glass w-full max-w-[29rem] rounded-3xl p-6 text-bone/90 will-transform md:p-8"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-b border-bone/12 pb-6">
              <Meta label="Location" value={property.location} />
              <Meta label="Dimensions" value={property.size} />
              <Meta label="Residence Type" value={property.type} />
              <Meta label="Viewing" value={`Film ${property.id}`} />
            </div>
            <p className="mt-6 text-sm leading-6 text-bone/75 md:text-base md:leading-7">
              {property.description}
            </p>
            <p className="mt-4 text-xs italic leading-5 text-bone/45 tracking-wide">
              {property.tone}
            </p>
            <div className="mt-8 flex justify-start">
              <MagneticButton
                href={`mailto:studio@lineaestates.com?subject=Inquiry: ${property.title}`}
                className="glass inline-flex h-12 w-48 items-center justify-center rounded-full text-xs uppercase tracking-[0.24em] text-champagne transition-colors hover:border-champagne/40 hover:bg-champagne hover:text-ink"
              >
                <span className="flex items-center gap-2">
                  Request Viewing
                  <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </MagneticButton>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.26em] text-bone/42">{label}</div>
      <div className="mt-1.5 text-sm font-light text-bone md:text-base">{value}</div>
    </div>
  );
}
