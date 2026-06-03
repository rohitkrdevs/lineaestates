"use client";

import dynamic from "next/dynamic";
import { Component, type ErrorInfo, type ReactNode } from "react";

const SceneCanvas = dynamic(() => import("@/components/SceneCanvas"), {
  ssr: false,
  loading: () => null
});

type BoundaryState = {
  failed: boolean;
};

class WebGLBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("3D layer disabled after a runtime load failure.", error, info.componentStack);
    }
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export function ClientOnly3D({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <WebGLBoundary>
      <SceneCanvas />
    </WebGLBoundary>
  );
}
