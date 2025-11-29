import { useState, useEffect, useCallback } from "react";

interface Breakpoints {
  mobile: number;  // below this is mobile
  tablet: number;  // between mobile and tablet is "tablet"
  desktop: number; // above or equal this is desktop
}

export function useResponsive(overrides: Partial<Breakpoints> = {}) {
  const defaultBps: Breakpoints = {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
  };

  const { mobile, tablet, desktop } = { ...defaultBps, ...overrides };

  const isClient = typeof window !== "undefined";

  const [size, setSize] = useState(() => ({
    width: isClient ? window.innerWidth : 0,
    height: isClient ? window.innerHeight : 0,
  }));

  // Resize handler using requestAnimationFrame
  const handleResize = useCallback(() => {
    let rafId: number | null = null;

    const onResize = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        rafId = null;
      });
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const cleanup = handleResize();
    return cleanup;
  }, [handleResize, isClient]);

  // Derived booleans
  const isMobile = size.width < mobile;
  const isTablet = size.width >= mobile && size.width < tablet;
  const isDesktop = size.width >= tablet;

  const above = (bp: keyof Breakpoints) => {
    switch (bp) {
      case "mobile":
        return size.width >= mobile;
      case "tablet":
        return size.width >= tablet;
      case "desktop":
        return size.width >= desktop;
    }
  };

  const below = (bp: keyof Breakpoints) => {
    switch (bp) {
      case "mobile":
        return size.width < mobile;
      case "tablet":
        return size.width < tablet;
      case "desktop":
        return size.width < desktop;
    }
  };

  return {
    width: size.width,
    height: size.height,
    isMobile,
    isTablet,
    isDesktop,
    above,
    below,
  };
}
