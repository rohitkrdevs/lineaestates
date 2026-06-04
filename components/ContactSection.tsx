"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";
import { properties } from "@/data/properties";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const gridBgRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    property: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      const card = cardRef.current;
      const header = headerRef.current;
      const leftCol = leftColRef.current;
      const rightCol = rightColRef.current;
      const gridBg = gridBgRef.current;
      if (!card || !header || !leftCol || !rightCol) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Entrance fade and slide-in for nested columns
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 76%",
          end: "bottom 90%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(
        header,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
      );

      tl.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.05, ease: "power4.out" },
        "-=0.5"
      );

      // Split sliding parallax layout on scroll
      const isMobile = window.innerWidth < 1024;
      if (!isMobile) {
        // Left text column moves downwards
        gsap.fromTo(
          leftCol,
          { y: -30 },
          {
            y: 35,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );

        // Right form card moves upwards
        gsap.fromTo(
          rightCol,
          { y: 40 },
          {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      } else {
        // Unified drift on mobile
        gsap.fromTo(
          [leftCol, rightCol],
          { y: 15 },
          {
            y: -15,
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

      // Parallax scroll on the background pattern
      if (gridBg) {
        gsap.fromTo(
          gridBg,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }
    },
    { scope: containerRef }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;

    // Simulate luxury submission experience
    gsap.to(cardRef.current, {
      opacity: 0,
      y: -20,
      scale: 0.98,
      duration: 0.55,
      onComplete: () => {
        setSubmitted(true);
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
        );
      }
    });
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      className="relative isolate bg-transparent px-5 py-32 sm:px-8 md:px-12 border-t border-bone/5"
      aria-labelledby="contact-heading"
    >
      {/* Background pattern */}
      <div
        ref={gridBgRef}
        className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(242,238,229,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(242,238,229,.05)_1px,transparent_1px)] [background-size:80px_80px] pointer-events-none will-transform"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1500px] gap-12 lg:grid-cols-[1fr_.9fr] lg:items-center">
        {/* Left Column Text Wrapper */}
        <div ref={leftColRef} className="will-transform lg:pr-10">
          <div ref={headerRef} className="will-transform">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-champagne/82">
              Private Viewings
            </p>
            <h2
              id="contact-heading"
              className="luxury-heading text-balance text-5xl font-bold leading-tight text-bone sm:text-6xl md:text-7xl lg:text-8xl md:leading-[1.02]"
            >
              Request Private Curation.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-bone/68 md:text-lg md:leading-8">
              Provide your details to initiate a bespoke inquiry. A designated portfolio advisor will coordinate a private presentation of our unlisted residences.
            </p>
          </div>
        </div>

        {/* Right Column Form Card Wrapper */}
        <div ref={rightColRef} className="will-transform">
          <div ref={cardRef} className="glass-card rounded-[2rem] p-7 md:p-10 will-transform">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Full Name */}
                <div className="relative border-b border-bone/12 pb-2">
                  <input
                    type="text"
                    name="name"
                    id="form-name"
                    required
                    placeholder="Full Name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent py-2 text-sm text-bone placeholder:text-bone/32 focus:outline-none focus:placeholder:opacity-0"
                  />
                </div>

                {/* Email Address */}
                <div className="relative border-b border-bone/12 pb-2">
                  <input
                    type="email"
                    name="email"
                    id="form-email"
                    required
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent py-2 text-sm text-bone placeholder:text-bone/32 focus:outline-none focus:placeholder:opacity-0"
                  />
                </div>

                {/* Residence Select Dropdown */}
                <div className="relative border-b border-bone/12 pb-2 select-container">
                  <select
                    name="property"
                    id="form-property"
                    value={formState.property}
                    onChange={handleInputChange}
                    className="w-full appearance-none bg-transparent py-2 text-sm text-bone focus:outline-none"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" disabled className="bg-ink text-bone/45">
                      Select Residence of Interest
                    </option>
                    {properties.map((p) => (
                      <option key={p.id} value={p.title} className="bg-ink text-bone">
                        {p.id} / {p.title}
                      </option>
                    ))}
                    <option value="Unlisted Portfolio" className="bg-ink text-bone">
                      General Inquiry (Unlisted Portfolio)
                    </option>
                  </select>
                  <div className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest text-champagne/65">
                    ▼
                  </div>
                </div>

                {/* Message */}
                <div className="relative border-b border-bone/12 pb-2">
                  <textarea
                    name="message"
                    id="form-message"
                    rows={3}
                    placeholder="Inquiry Details / Preferred Viewing Window"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="w-full resize-none bg-transparent py-2 text-sm text-bone placeholder:text-bone/32 focus:outline-none focus:placeholder:opacity-0"
                  />
                </div>

                {/* Submit CTA */}
                <div className="mt-4 flex">
                  <MagneticButton
                    type="submit"
                    className="border border-champagne inline-flex h-13 w-48 items-center justify-center text-xs uppercase tracking-[0.24em] text-champagne transition-colors duration-300 hover:bg-champagne hover:text-ink"
                  >
                    Submit Inquiry
                  </MagneticButton>
                </div>
              </form>
            ) : (
              <div className="text-center py-10">
                <span className="luxury-heading text-xs font-bold uppercase tracking-[0.38em] text-champagne">
                  Thank You
                </span>
                <h3 className="luxury-heading mt-6 text-3xl font-bold text-bone">
                  Inquiry Logged
                </h3>
                <p className="mx-auto mt-4 text-base leading-7 text-bone/66">
                  Your portfolio request has been transmitted securely. An advisor will contact you within 24 hours to schedule a private call.
                </p>
                <div className="mt-8 flex justify-center">
                  <MagneticButton
                    onClick={() => {
                      setFormState({ name: "", email: "", property: "", message: "" });
                      setSubmitted(false);
                    }}
                    className="border border-bone/40 inline-flex h-11 w-44 items-center justify-center text-xs uppercase tracking-[0.25em] text-bone/65 transition-colors duration-300 hover:bg-bone hover:text-ink"
                  >
                    Submit Another
                  </MagneticButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
