"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const articles = [
  {
    tag: "Materiality",
    date: "May 2026",
    title: "Sourcing the Silent: Tivoli Travertine Curation",
    desc: "A deep dive into selecting limestone blocks that capture architectural permanence and frame raw light.",
    readTime: "6 min read",
    image: "/images/travertine.png"
  },
  {
    tag: "Design Theory",
    date: "April 2026",
    title: "Choreographing Shadows: The Geometry of Absence",
    desc: "How Japanese spatial concepts dictate the placement of horizontal volumes and dark spatial transitions.",
    readTime: "8 min read",
    image: "/images/shadow.png"
  },
  {
    tag: "Acoustics",
    date: "March 2026",
    title: "High-Altitude Soundscapes: Concrete Acoustics",
    desc: "Analyzing the dampening and deflection of sound in glass pavilions and cantilevered hillside volumes.",
    readTime: "5 min read",
    image: "/images/pavilion.png"
  }
];

export function BlogsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      const header = headerRef.current;
      if (!grid || !header) return;

      const cards = grid.querySelectorAll(".blog-card");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 76%",
          end: "bottom 84%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(
        header,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
      );

      tl.fromTo(
        cards,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.15,
          ease: "power4.out"
        },
        "-=0.5"
      );

      // Card wrapper scroll-linked parallax
      const wrappers = grid.querySelectorAll(".blog-card-wrapper");
      const isMobile = window.innerWidth < 768;

      wrappers.forEach((wrapper, index) => {
        const yOffset = isMobile ? (index - 1) * 12 : (index - 1) * 45;
        
        gsap.fromTo(
          wrapper,
          { y: yOffset },
          {
            y: -yOffset,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2
            }
          }
        );
      });

      // Inner image parallax drift
      const images = grid.querySelectorAll(".blog-card-image");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="journal"
      className="relative isolate bg-ink px-5 py-32 sm:px-8 md:px-12 border-t border-white/5"
      aria-label="Editorial Journal"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px]">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16 md:mb-20 will-transform">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.38em] text-champagne/82">
            The Insight
          </p>
          <h2 className="luxury-heading text-balance text-5xl font-bold leading-tight text-bone sm:text-6xl md:text-7xl">
            The Journal
          </h2>
        </div>

        {/* Articles Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {articles.map((article, i) => (
            <div key={i} className="blog-card-wrapper h-full will-transform">
              <article
                className="blog-card glass-card h-full group flex flex-col justify-between rounded-3xl p-5 transition-colors duration-500 hover:border-champagne/25 will-transform"
              >
                <div>
                  {/* Premium Thumbnail Image */}
                  <div className="overflow-hidden rounded-2xl aspect-[1.6] mb-6 bg-ink relative">
                    <div className="h-full w-full overflow-hidden transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="blog-card-image h-[116%] w-full object-cover -translate-y-[8%] will-transform"
                      />
                    </div>
                    <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  <div className="flex items-center justify-between text-[0.6rem] uppercase tracking-[0.24em] text-bone/45">
                    <span>{article.tag}</span>
                    <span>{article.date}</span>
                  </div>
                  <h3 className="luxury-heading mt-6 text-2xl font-bold leading-snug text-bone group-hover:text-champagne transition-colors duration-300 sm:text-3xl">
                    {article.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-bone/65">
                    {article.desc}
                  </p>
                </div>

                <div className="mt-10 flex items-center justify-between border-t border-bone/6 pt-5 text-xs font-bold uppercase tracking-[0.24em]">
                  <span className="text-bone/42">{article.readTime}</span>
                  <span className="flex items-center gap-1.5 text-champagne group-hover:text-white transition-colors duration-300">
                    Read Essay
                    <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
