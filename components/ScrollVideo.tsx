"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type ScrollVideoProps = {
  src: string;
  scrub?: boolean;
  parallax?: boolean;
  overlay?: boolean;
  className?: string;
  priority?: boolean;
};

export function ScrollVideo({
  src,
  scrub = false,
  parallax = false,
  overlay = true,
  className,
  priority = false
}: ScrollVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.16, rootMargin: "24% 0px" }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      const video = videoRef.current;
      if (!wrapper || !video || reducedMotion) return;

      const trigger = wrapper.closest("section") ?? wrapper;

      if (parallax) {
        gsap.fromTo(
          video,
          { scale: 1.15, yPercent: -3, opacity: 0.68 },
          {
            scale: 1,
            yPercent: 3,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          }
        );
      }

      if (scrub && duration > 0) {
        video.pause();

        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: "+=170%",
          scrub: 0.25,
          onUpdate: (self) => {
            if (!Number.isFinite(duration)) return;
            video.currentTime = Math.min(duration - 0.05, duration * self.progress);
          }
        });
      }
    },
    { dependencies: [duration, parallax, reducedMotion, scrub], scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={clsx("absolute inset-0 overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload={priority ? "auto" : "metadata"}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        aria-hidden="true"
      />
      {overlay ? (
        <div className="absolute inset-0" style={{ background: "var(--video-overlay)" }} />
      ) : null}
    </div>
  );
}
