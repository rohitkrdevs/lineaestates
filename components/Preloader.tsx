"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type PreloaderProps = {
  sources: string[];
  onComplete?: () => void;
};

export function Preloader({ sources, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const uniqueSources = useMemo(() => Array.from(new Set(sources)), [sources]);

  useEffect(() => {
    let completed = 0;
    let cancelled = false;
    const videos: HTMLVideoElement[] = [];

    const markReady = () => {
      if (cancelled) return;
      completed += 1;
      setProgress(Math.round((completed / uniqueSources.length) * 100));

      if (completed >= uniqueSources.length) {
        window.setTimeout(() => {
          setVisible(false);
          onComplete?.();
        }, 420);
      }
    };

    const fallback = window.setTimeout(() => {
      if (!cancelled) {
        setProgress(100);
        setVisible(false);
        onComplete?.();
      }
    }, 2800);

    uniqueSources.forEach((src) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;
      video.src = src;
      video.addEventListener("loadedmetadata", markReady, { once: true });
      video.addEventListener("error", markReady, { once: true });
      video.load();
      videos.push(video);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
      videos.forEach((video) => {
        video.removeAttribute("src");
        video.load();
      });
    };
  }, [onComplete, uniqueSources]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center bg-ink text-bone"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
        >
          <div className="w-[min(28rem,78vw)] text-center">
            <div className="luxury-heading text-4xl uppercase tracking-normal md:text-6xl">
              Loading Estates
            </div>
            <div className="mt-8 h-px overflow-hidden bg-bone/12">
              <motion.div
                className="h-full origin-left bg-champagne"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </div>
            <div className="mt-4 text-xs uppercase tracking-[0.38em] text-bone/55">
              {progress.toString().padStart(2, "0")}%
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
