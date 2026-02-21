import { useEffect } from "react";

/**
 * Utility hook to ensure page styles and animations are properly initialized
 * Prevents FOUC (Flash of Unstyled Content) on page reload
 */
export const usePageInitialization = (pageClass: string) => {
  useEffect(() => {
    // Ensure the page class is applied immediately
    const body = document.body;
    const html = document.documentElement;

    // Add loading state class
    body.classList.add("page-loading");

    // Force style recalculation
    void html.offsetHeight;

    // Remove loading state after a short delay
    const timer = setTimeout(() => {
      body.classList.remove("page-loading");
      body.classList.add("page-loaded");

      // Ensure all animated elements are visible
      const animatedElements = document.querySelectorAll(
        ".reveal-text, .service-item, .contact-item, .divider-line",
      );
      animatedElements.forEach((el) => {
        const element = el as HTMLElement;
        if (element.style.opacity === "0" || !element.style.opacity) {
          element.style.opacity = "1";
        }
        if (
          element.style.transform &&
          element.style.transform.includes("translateY(100px)")
        ) {
          element.style.transform = "translateY(0)";
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      body.classList.remove("page-loading", "page-loaded");
    };
  }, [pageClass]);
};

/**
 * Utility to ensure GSAP animations have proper fallbacks
 */
export const ensureAnimations = () => {
  // Check if GSAP is available
  if (typeof window !== "undefined" && !window.gsap) {
    console.warn("GSAP not available, using CSS fallbacks");
    return false;
  }
  return true;
};

/**
 * Initialize page-specific animations with fallbacks
 */
export const initializePageAnimations = () => {
  const hasGSAP = ensureAnimations();

  if (!hasGSAP) {
    // CSS-only fallbacks
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        ".reveal-text, .service-item, .contact-item, .divider-line",
      );
      elements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transition = "all 0.6s ease";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });
    }, 200);

    return () => clearTimeout(timer);
  }

  return () => {}; // No cleanup needed for GSAP
};
