"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./MagneticButton";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function FooterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const brandTextRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  useGSAP(
    () => {
      const footer = footerRef.current;
      const grid = gridRef.current;
      const brandText = brandTextRef.current;
      if (!footer || !grid || !brandText) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // Floating background display text parallax
      gsap.fromTo(
        brandText,
        { yPercent: 8, opacity: 0 },
        {
          yPercent: -8,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1.2
          }
        }
      );

      // Staggered columns slide up reveal
      const columns = grid.children;
      gsap.fromTo(
        columns,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footer,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="relative isolate border-t border-bone/6 bg-ink/95 px-5 py-20 text-bone/90" aria-label="Footer">
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        {/* Top footer grid */}
        <div ref={gridRef} className="grid grid-cols-1 gap-12 border-b border-bone/6 pb-16 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          
          {/* Brand Col */}
          <div className="lg:col-span-2">
            <span className="luxury-heading text-2xl font-bold tracking-[0.2em] uppercase text-bone select-none">
              LINEA
            </span>
            <p className="mt-6 max-w-sm text-base leading-7 text-bone/65">
              Curators of quiet living volumes, cinematic daylight alignment, and enduring modern architecture.Sourcing private portfolios on a discresional referral basis.
            </p>
          </div>

          {/* Directory Col */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.28em] text-champagne/82 mb-6 font-bold">
              Directory
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-semibold tracking-wider text-bone/70">
              <li><a href="#about" className="hover:text-champagne transition-colors">Philosophy</a></li>
              <li><a href="#why-us" className="hover:text-champagne transition-colors">The Standard</a></li>
              <li><a href="#services" className="hover:text-champagne transition-colors">Services</a></li>
              <li><a href="#properties" className="hover:text-champagne transition-colors">Residences</a></li>
              <li><a href="#journal" className="hover:text-champagne transition-colors">The Journal</a></li>
            </ul>
          </div>

          {/* Locations Col */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.28em] text-champagne/82 mb-6 font-bold">
              Locations
            </h4>
            <ul className="flex flex-col gap-4 text-sm tracking-wider text-bone/65">
              <li>
                <div className="text-bone font-bold">Malibu Studio</div>
                <div className="text-xs text-bone/48 mt-1">2190 Pacific Coast Hwy, CA</div>
              </li>
              <li>
                <div className="text-bone font-bold">Tokyo Office</div>
                <div className="text-xs text-bone/48 mt-1">5-Chome Minami-Aoyama, Tokyo</div>
              </li>
              <li>
                <div className="text-bone font-bold">London Gallery</div>
                <div className="text-xs text-bone/48 mt-1">42 Mayfair, London, UK</div>
              </li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.28em] text-champagne/82 mb-6 font-bold">
              Newsletter
            </h4>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                <p className="text-xs font-semibold leading-5 text-bone/58">
                  Subscribe for updates on off-market listings and private journal essays.
                </p>
                <div className="relative border-b border-bone/12 pb-2">
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent py-1 text-xs text-bone placeholder:text-bone/25 focus:outline-none"
                  />
                </div>
                <div className="mt-2 flex">
                  <MagneticButton
                    onClick={undefined}
                    className="glass inline-flex h-9 w-32 items-center justify-center rounded-full text-[0.58rem] uppercase tracking-[0.2em] text-champagne transition-colors hover:border-champagne/45 hover:bg-champagne hover:text-ink"
                  >
                    Subscribe
                  </MagneticButton>
                </div>
              </form>
            ) : (
              <div className="py-2">
                <span className="text-[0.62rem] uppercase tracking-[0.24em] text-champagne">
                  Confirmed
                </span>
                <p className="mt-3 text-xs leading-5 text-bone/58">
                  Welcome to Linea. You will receive private announcements.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Large LINEA watermark inline between menu and copyright */}
        <div className="relative w-full overflow-x-hidden py-4 select-none pointer-events-none my-6">
          <div
            ref={brandTextRef}
            className="select-none text-[clamp(4rem,20vw,16rem)] font-bold tracking-[0.2em] text-bone/[0.035] will-transform text-center whitespace-nowrap uppercase leading-none"
          >
            LINEA
          </div>
        </div>

        {/* Bottom footer bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 pt-4 text-[0.58rem] uppercase tracking-[0.26em] text-bone/35 sm:flex-row">
          <div>© 2026 Linea Estates. All rights reserved.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-bone transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-bone transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-bone transition-colors">Instagram</a>
            <a href="#" className="hover:text-bone transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
