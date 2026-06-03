"use client";

import React, { useRef } from "react";
import gsap from "gsap";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function MagneticButton({ children, className, href, onClick, type = "button" }: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent) => {
    const container = containerRef.current;
    const element = elementRef.current;
    if (!container || !element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    // Shift the text/icon slightly more than the container boundary for 3D depth
    gsap.to(element, {
      x: x * 0.42,
      y: y * 0.42,
      duration: 0.35,
      ease: "power2.out",
    });

    gsap.to(container, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handlePointerLeave = () => {
    const container = containerRef.current;
    const element = elementRef.current;
    if (!container || !element) return;

    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.45)",
    });

    gsap.to(container, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: "elastic.out(1, 0.45)",
    });
  };

  const innerContent = (
    <div ref={elementRef} className="flex h-full w-full items-center justify-center">
      {children}
    </div>
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
    >
      {href ? (
        <a href={href} className="focus-ring block h-full w-full select-none" onClick={onClick}>
          {innerContent}
        </a>
      ) : (
        <button type={type} className="focus-ring block h-full w-full select-none" onClick={onClick}>
          {innerContent}
        </button>
      )}
    </div>
  );
}
