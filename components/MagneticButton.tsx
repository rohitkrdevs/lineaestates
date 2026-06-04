"use client";

import React from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export function MagneticButton({ children, className, href, onClick, type = "button" }: MagneticButtonProps) {
  if (href) {
    return (
      <a href={href} className={`focus-ring select-none ${className || ""}`} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={`focus-ring select-none ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
