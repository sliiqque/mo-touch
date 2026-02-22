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
      title: "BRIDAL MAKEUP",
      desc: "Bridal Perfection, Unforgettable Moments. Flawless, camera-ready looks that enhance your natural beauty and withstand tears of joy, dancing, and countless photos.",
      tags: [
        "Pre-wedding Consultation",
        "Makeup Trial",
        "Waterproof Formula",
        "Photography-ready Finish",
        "Touch-up Kit",
        "False Lashes",
      ],
    },
    {
      id: "02",
      title: "PROFESSIONAL MAKEUP",
      desc: "Everyday Elegance, Special Occasion Glamour. Professional makeup services that enhance your natural features with precision and artistry for any event.",
      tags: [
        "Special Events",
        "Photoshoot Makeup",
        "Red Carpet Looks",
        "Natural Enhancement",
        "Custom Color Matching",
        "Skin Preparation",
      ],
    },
    {
      id: "03",
      title: "MAKEUP TRAINING",
      desc: "Master the Art: Professional Makeup Instruction. Personalized training from beginner techniques to professional certification with hands-on experience.",
      tags: [
        "One-on-one Lessons",
        "Group Workshops",
        "Professional Certification",
        "Bridal Specialization",
        "Advanced Techniques",
        "Industry Insights",
      ],
    },
    {
      id: "04",
      title: "COLLABORATIVE PACKAGES",
      desc: "Complete beauty experiences through strategic partnerships. From costume to makeup, and makeup to photography - comprehensive solutions for your special moments.",
      tags: [
        "Costume by Mo Partnership",
        "Uncle Mo Studio Photography",
        "Complete Look Packages",
        "Themed Events",
        "Creative Projects",
        "Professional Coordination",
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
          // MO_SERVICES
        </div>
        <h1 className="page-title">
          <span className="service-header-text">LOOK RADIANT,</span>
          <span
            className="service-header-text"
            style={{
              color: "#fff",
              display: "flex",
              WebkitTextStroke: "0",
              justifyContent: "end",
            }}
          >
            FEEL CONFIDENT
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
        // END_OF_MO_SERVICES
      </div>
    </div>
  );
};

export default Services;
