"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        setProgress(Math.round(self.progress * 100));
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex mix-blend-difference" aria-hidden="true">
      <span className="text-[0.6rem] font-light tracking-[0.28em] text-champagne/82 select-none">
        {progress.toString().padStart(3, "0")}
      </span>
      <div className="h-44 w-px bg-bone/12 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full bg-champagne origin-top transition-transform duration-100 ease-out"
          style={{
            height: "100%",
            transform: `scaleY(${progress / 100})`,
          }}
        />
      </div>
    </div>
  );
}
