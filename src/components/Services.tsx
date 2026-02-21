import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      id: "01",
      title: "DIGITAL_STRATEGY",
      desc: "Blueprint for digital dominance. We architect the unseen foundations of your brand's future.",
      tags: [
        "Brand Architecture",
        "User Journey",
        "Market Analysis",
        "Growth Systems",
      ],
    },
    {
      id: "02",
      title: "UI/UX_DESIGN",
      desc: "Crafting the interface of tomorrow. Brutalist aesthetics meets human-centric functionality.",
      tags: [
        "Interface Design",
        "Experience Systems",
        "Design Systems",
        "Prototyping",
      ],
    },
    {
      id: "03",
      title: "WEB_DEVELOPMENT",
      desc: "Code as art. Performance-obsessed engineering for the modern web.",
      tags: [
        "React/Next.js",
        "WebGL/Three.js",
        "Headless CMS",
        "Performance Opt.",
      ],
    },
    {
      id: "04",
      title: "MOTION_GRAPHICS",
      desc: "Breathing life into pixels. Kinetic typography and fluid transitions.",
      tags: [
        "2D/3D Animation",
        "Interaction Design",
        "Micro-interactions",
        "Video Production",
      ],
    },
  ];

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".service-header-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Line animations
      gsap.from(".divider-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.1,
        delay: 0.5,
      });

      // Service Item Animations
      // Set initial state to avoid FOUC but ensure visibility if JS fails
      gsap.set(".service-item", { autoAlpha: 0, y: 50 });

      gsap.to(".service-item", {
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
      const headerElements = document.querySelectorAll(".service-header-text");
      const serviceElements = document.querySelectorAll(".service-item");
      const lineElements = document.querySelectorAll(".divider-line");

      headerElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });

      serviceElements.forEach((el) => {
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

  const handleMouseEnter = (index: number) => {
    setActiveService(index);
    // playSound("hover"); removed
  };

  const handleMouseLeave = () => {
    setActiveService(null);
  };

  return (
    <div className="services-page" ref={containerRef}>
      <div className="header-section">
        <div className="page-subtitle service-header-text">
          // SYSTEM_CAPABILITIES
        </div>
        <h1 className="page-title">
          <span className="service-header-text">PROTOCOL</span>
          <span
            className="service-header-text"
            style={{ color: "#fff", WebkitTextStroke: "0" }}
          >
            SERVICES
          </span>
        </h1>
      </div>

      <div className="services-list">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`service-item ${activeService !== null && activeService !== index ? "dimmed" : ""}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="divider-line"></div>
            <div className="service-content">
              <div className="service-id">{service.id}</div>
              <div className="service-main">
                <div className="service-title">{service.title}</div>
                <div className="service-desc">{service.desc}</div>
              </div>
              <div className="service-tags">
                {service.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="service-tag-item"
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="divider-line" style={{ top: "auto", bottom: 0 }}></div>
      </div>

      <div
        style={{
          marginTop: "10vh",
          fontFamily: "TheGoodMonolith, monospace",
          textAlign: "center",
          opacity: 0.5,
        }}
      >
        // END_OF_PROTOCOL
      </div>
    </div>
  );
};

export default Services;
