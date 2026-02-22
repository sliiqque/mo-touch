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
  const {
    services,
    handleMouseEnter,
    handleMouseLeave,
    isServiceActive,
    isServiceDimmed,
  } = useServices();

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Line animations
      gsap.from(".divider-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.1,
        delay: 0.5,
      });

      // Content Item Animations
      // Set initial state to avoid FOUC but ensure visibility if JS fails
      gsap.set(".content-item", { autoAlpha: 0, y: 50 });

      gsap.to(".content-item", {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2, // Reduced delay
        clearProps: "transform", // Keep opacity/visibility, clear transform to avoid stacking context issues
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Fallback animation for page reload
  useEffect(() => {
    const timer = setTimeout(() => {
      // Ensure elements are visible even if GSAP fails
      const contentElements = document.querySelectorAll(".content-item");
      const lineElements = document.querySelectorAll(".divider-line");

      contentElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });

      lineElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = "scaleX(1)";
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="services-page" ref={containerRef}>
      <Header />
      <div className="services-list">
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
        <div className="divider-line" style={{ top: "auto", bottom: 0 }}></div>
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
      <SectionFooter style={{ marginTop: "4vh" }} text="// END_OF_SERVICES" />
    </div>
  );
};

export default Services;
