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
      tl.fromTo(
        [title, subtitle],
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -50,
          opacity: 0,
          ease: "none"
        },
        0
      );

      // Animate button out
      tl.fromTo(
        btn,
        { yPercent: 0, opacity: 1, scale: 1 },
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
      className="relative isolate flex h-[75vh] md:h-screen md:min-h-screen items-center overflow-hidden bg-transparent"
      aria-label="The Building Introduction"
    >
      {/* Background building video with parallax and custom overlay */}
      <ScrollVideo src="/videos/home-5.mp4" parallax overlay={false} priority />

      {/* Interactive dark overlay animated by ScrollTrigger */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(8,8,7,0.38),rgba(8,8,7,0.58)_50%,rgba(8,8,7,0.78))]"
        style={{ transition: "background-color 0.1s ease-out" }}
      />

      <div
        ref={containerRef}
        className="relative z-30 mx-auto flex h-full md:min-h-screen w-full max-w-[1500px] flex-col justify-end px-5 pb-16 pt-24 sm:px-8 md:justify-center md:px-12 md:pb-16"
      >
        <div className="max-w-5xl">
          <h1
            ref={titleRef}
            className="luxury-heading font-bold text-balance text-[clamp(2.6rem,10vw,12.5rem)] leading-[0.78] text-white will-transform"
          >
            LINEA
            <br />
            ESTATES
          </h1>
          
          <p
            ref={subtitleRef}
            className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/80 md:text-xl md:leading-relaxed"
          >
            A silent collection of modernist volumes aligned to natural daylight.
          </p>
 
          <div ref={buttonWrapperRef} className="mt-12 flex flex-wrap gap-5 will-transform">
            <MagneticButton
              href="#properties"
              className="border border-white/25 inline-flex h-13 w-48 sm:h-16 sm:w-56 text-[0.7rem] sm:text-xs uppercase tracking-[0.28em] text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink"
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
      <div className="absolute bottom-7 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3 text-xs uppercase tracking-[0.36em] text-bone/58 mix-blend-difference select-none" aria-hidden="true">
        <span>Scroll</span>
        <span className="h-14 w-px overflow-hidden bg-bone/18">
          <span className="block h-1/2 w-px animate-[scrollPulse_1.8s_ease-in-out_infinite] bg-champagne" />
        </span>
      </div>
    </section>
  );
}
