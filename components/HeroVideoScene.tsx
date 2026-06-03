"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollVideo } from "./ScrollVideo";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroVideoScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const btn = buttonWrapperRef.current;
      const overlay = overlayRef.current;
      if (!section || !title || !subtitle || !btn || !overlay) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Opening cinematic reveal of title layers
      gsap.fromTo(
        [title, subtitle, btn],
        { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.2
        }
      );

      // Continuous pinned timeline linking scroll to video and UI transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1
        }
      });

      // Animate text upward and fade it
      tl.to(
        [title, subtitle],
        {
          yPercent: -50,
          opacity: 0,
          ease: "none"
        },
        0
      );

      // Animate button out
      tl.to(
        btn,
        {
          yPercent: -30,
          opacity: 0,
          scale: 0.95,
          ease: "none"
        },
        0
      );

      // Lighten overlay as the camera pushes forward into properties
      tl.to(
        overlay,
        {
          backgroundColor: "rgba(250, 249, 246, 0.88)",
          ease: "none"
        },
        0
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="section-shell relative isolate flex items-center overflow-hidden bg-ink"
      aria-label="The Building Introduction"
    >
      {/* Background building video with parallax and custom overlay */}
      <ScrollVideo src="/videos/building.mp4" parallax overlay={false} priority />

      {/* Interactive dark overlay animated by ScrollTrigger */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(8,8,7,0.38),rgba(8,8,7,0.58)_50%,rgba(8,8,7,0.78))]"
        style={{ transition: "background-color 0.1s ease-out" }}
      />

      <div
        ref={containerRef}
        className="relative z-30 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col justify-end px-5 pb-24 pt-32 sm:px-8 md:justify-center md:px-12 md:pb-16"
      >
        <div className="max-w-5xl select-none">
          <h1
            ref={titleRef}
            className="luxury-heading font-bold text-balance text-[clamp(4.3rem,13vw,12.5rem)] leading-[0.78] text-white will-transform"
          >
            LINEA
            <br />
            ESTATES
          </h1>
          
          <p
            ref={subtitleRef}
            className="mt-8 max-w-xl text-base font-semibold leading-7 text-white/90 md:text-xl md:leading-8 will-transform"
          >
            A cinematic journey through high-altitude residences, modernist courtyard houses, and sea-facing architectural collections.
          </p>
 
          <div ref={buttonWrapperRef} className="mt-10 inline-block will-transform">
            <MagneticButton
              href="#properties"
              className="glass border-white/20 inline-flex h-16 w-56 items-center justify-center rounded-full text-xs uppercase tracking-[0.28em] text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
            >
              <span className="flex items-center gap-3">
                Explore Residences
                <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Floating scroll indicator */}
      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.36em] text-bone/58 mix-blend-difference select-none" aria-hidden="true">
        <span>Scroll</span>
        <span className="h-14 w-px overflow-hidden bg-bone/18">
          <span className="block h-1/2 w-px animate-[scrollPulse_1.8s_ease-in-out_infinite] bg-champagne" />
        </span>
      </div>
    </section>
  );
}
