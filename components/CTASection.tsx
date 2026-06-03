"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const bg = bgRef.current;
      const content = contentRef.current;
      if (!section || !bg || !content) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Create scroll parallax on background card expansion
      gsap.fromTo(
        bg,
        { scale: 0.95, borderRadius: "2.5rem", opacity: 0.76 },
        {
          scale: 1,
          borderRadius: "0px",
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      // Light-shift parallax on the radial gradient background
      gsap.fromTo(
        bg,
        { "--spotlight-y": "20%" },
        {
          "--spotlight-y": "80%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );

      // Reveal text content opacity on enter
      gsap.fromTo(
        content,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Scroll-scrubbed parallax translation on content text
      gsap.fromTo(
        content,
        { y: 65 },
        {
          y: -65,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[85vh] flex items-center justify-center overflow-hidden bg-ink py-28 px-5 border-t border-bone/5"
      aria-label="Call to Action"
    >
      {/* Parallax Background Expansion Card with spotlight gradient */}
      <div
        ref={bgRef}
        style={{
          backgroundImage: "radial-gradient(ellipse at 50% var(--spotlight-y, 50%), rgba(158,127,67,0.07), transparent 65%)",
          ["--spotlight-y" as any]: "30%"
        }}
        className="absolute inset-0 z-0 bg-ink will-transform"
      />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto w-full max-w-4xl text-center will-transform"
      >
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.38em] text-champagne/82">
          The Acquisition
        </p>
        <h2 className="luxury-heading mb-8 text-[clamp(3.5rem,8vw,7.8rem)] font-bold leading-[0.9] text-bone">
          Transition into
          <br />
          Silence.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-bone/68 md:text-lg md:leading-8">
          Request private portfolio access and begin planning a bespoke real estate procurement. Our studio works on an exclusive referral and invitation basis.
        </p>

        <div className="mt-12 flex justify-center">
          <MagneticButton
            href="#contact"
            className="glass inline-flex h-16 w-56 items-center justify-center rounded-full text-[0.7rem] uppercase tracking-[0.28em] text-bone transition-colors hover:border-champagne/45 hover:bg-bone hover:text-ink"
          >
            <span className="flex items-center gap-2">
              Begin Inquiry
              <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
