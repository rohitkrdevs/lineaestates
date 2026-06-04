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

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const slideX = isDesktop ? side * 120 : 0;
      const slideY = isDesktop ? 0 : 80;

      tl.fromTo(
        details,
        { x: slideX, y: slideY, opacity: 0, scale: 0.96 },
        { x: 0, y: 0, opacity: 1, scale: 1, ease: "power3.out" },
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
      className="section-shell relative isolate flex items-center overflow-hidden bg-transparent"
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

      {/* Main content grid */}
      <div
        ref={containerRef}
        className="relative z-30 mx-auto grid min-h-screen w-full max-w-[1500px] grid-cols-1 items-center gap-12 px-5 py-28 sm:px-8 md:px-12 lg:grid-cols-[1.1fr_.9fr]"
      >
        {/* Title and ID columns */}
        <div className={alignRight ? "lg:order-2" : ""}>
          <div className="relative">
            <div
              ref={numberRef}
              className="luxury-heading absolute -top-14 -left-4 text-[7.5rem] leading-[0] text-champagne/15 select-none will-transform md:-top-20 md:-left-8 md:text-[11.5rem]"
              aria-hidden="true"
            >
              {property.id}
            </div>
            <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.34em] text-champagne/90">
              <span>Residence</span>
              <span className="opacity-40">•</span>
              <span>{property.location}</span>
            </div>
            <h2
              id={`property-${property.id}`}
              ref={titleRef}
              className="luxury-heading font-bold max-w-2xl text-balance text-[clamp(2.2rem,6vw,7.8rem)] leading-[0.88] text-white will-transform"
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
                className="border border-champagne inline-flex items-center justify-center px-8 py-3.5 text-xs uppercase tracking-[0.24em] text-champagne transition-colors duration-300 hover:bg-champagne hover:text-ink"
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
