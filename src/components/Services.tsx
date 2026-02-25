import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useServices } from "../hooks/useServices";
import { useRef, useLayoutEffect, useEffect, type FC } from "react";
import gsap from "gsap";
import Header from "./layout/Header";
import Marquee from "./layout/Marquee.js";
import ContentCard from "./layout/ContentCard.js";
import SectionFooter from "./layout/SectionFooter";

gsap.registerPlugin(ScrollTrigger);
const Services: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const servicesListRef = useRef<HTMLDivElement>(null);
  const dividerLineRef = useRef<HTMLDivElement>(null);

  const {
    services,
    handleMouseEnter,
    handleMouseLeave,
    isServiceActive,
    isServiceDimmed,
  } = useServices();

  // Styles
  const styles = {
    servicesPage: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "#0a0a0a",
      color: "#e0e0e0",
      fontFamily: '"PPNeueMontreal", sans-serif',
      padding: "120px 5vw 5vw 5vw",
      position: "relative" as const,
      overflowY: "auto" as const,
      overflowX: "hidden" as const,
      cursor: "none",
      WebkitOverflowScrolling: "touch" as const,
      scrollbarWidth: "none" as const,
      msOverflowStyle: "none" as const,
    },
    servicesList: {
      display: "flex",
      flexDirection: "column" as const,
      width: "100%",
      position: "relative" as const,
      zIndex: 2,
    },
    dividerLine: {
      height: "1px",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      position: "absolute" as const,
      top: "auto",
      bottom: 0,
      left: 0,
    },
  };

  // Hide scrollbar for webkit browsers
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .services-page::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line animations
      if (dividerLineRef.current) {
        gsap.from(dividerLineRef.current, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.5,
          ease: "expo.inOut",
          delay: 0.5,
        });
      }

      // Content Item Animations
      const contentItems =
        servicesListRef.current?.querySelectorAll(".content-item") || [];
      gsap.set(contentItems, { autoAlpha: 0, y: 50 });

      gsap.to(contentItems, {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
        clearProps: "transform",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Fallback animation for page reload
  useEffect(() => {
    const timer = setTimeout(() => {
      // Ensure elements are visible even if GSAP fails
      const contentElements =
        containerRef.current?.querySelectorAll(".content-item");
      const lineElement = dividerLineRef.current;

      contentElements?.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });

      if (lineElement) {
        lineElement.style.transform = "scaleX(1)";
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.servicesPage} ref={containerRef}>
      <Header />
      <div style={styles.servicesList} ref={servicesListRef}>
        {services.map((service, index) => (
          <ContentCard
            index={index}
            key={service.id}
            content={service}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            isActive={isServiceActive(index)}
            isDimmed={isServiceDimmed(index)}
          />
        ))}
        <div style={styles.dividerLine} ref={dividerLineRef}></div>
      </div>
      {/* Marquee Section */}
      <Marquee
        items={[
          "BRIDAL PERFECTION",
          "CAMERA-READY BEAUTY",
          "REDCARPET GLAMOUR",
          "PROFESSIONAL EXCELLENCE",
          "MASTER YOUR CRAFT",
          "COMPLETE BEAUTY SOLUTIONS",
        ]}
        repetitions={4}
      />
      <SectionFooter text="// END_OF_SERVICES" />
    </div>
  );
};

export default Services;
