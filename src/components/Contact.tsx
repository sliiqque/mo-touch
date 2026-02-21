import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation - remove opacity: 0 to ensure visibility
      gsap.from(".reveal-text", {
        y: 100,
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

      // Contact items - remove autoAlpha: 0 to ensure visibility
      gsap.from(".contact-item", {
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });

      // Marquee Animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Fallback animation for page reload
  useEffect(() => {
    const timer = setTimeout(() => {
      // Ensure elements are visible even if GSAP fails
      const revealElements = document.querySelectorAll(".reveal-text");
      const contactElements = document.querySelectorAll(".contact-item");
      const lineElements = document.querySelectorAll(".divider-line");

      revealElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });

      contactElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });

      lineElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = "scaleX(1)";
      });

      // Ensure marquee is animating
      if (marqueeRef.current) {
        marqueeRef.current.style.transform = "translateX(-50%)";
        marqueeRef.current.style.transition = "transform 20s linear infinite";
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const contactItems = [
    {
      id: "01",
      label: "DIRECT_LINE",
      value: "HELLO@MO-TOUCH.COM",
      subValue: "+1 (555) 000-0000",
      link: "mailto:hello@mo-touch.com",
    },
    {
      id: "02",
      label: "HQ_COORDINATES",
      value: "1200 INDUSTRIAL AVE",
      subValue: "SECTOR 7G, NY 10001",
      link: "https://maps.google.com",
    },
    {
      id: "03",
      label: "SOCIAL_FEED",
      value: "INSTAGRAM",
      subValue: "TWITTER / LINKEDIN / BEHANCE",
      link: "https://instagram.com",
    },
  ];

  return (
    <div className="contact-page" ref={containerRef}>
      <div className="header-section">
        <div className="page-subtitle reveal-text">// UPLINK_TERMINAL</div>
        <h1 className="page-title">
          <span className="reveal-text">INITIATE</span>
          <span
            className="reveal-text"
            style={{ color: "#fff", WebkitTextStroke: "0" }}
          >
            CONTACT
          </span>
        </h1>
      </div>

      <div className="contact-list">
        {contactItems.map((item, index) => (
          <div
            key={item.id}
            className={`contact-item ${activeItem !== null && activeItem !== index ? "dimmed" : ""}`}
            onMouseEnter={() => {
              setActiveItem(index);
              // playSound("hover"); removed
            }}
            onMouseLeave={() => setActiveItem(null)}
            // onClick={() => playSound("click")} removed
          >
            <div className="divider-line"></div>
            <a href={item.link} className="contact-link">
              <div className="contact-content">
                <div className="item-id">{item.id}</div>
                <div className="item-main">
                  <div className="item-label">// {item.label}</div>
                  <div className="item-value">{item.value}</div>
                  {item.subValue && (
                    <div className="item-subvalue">{item.subValue}</div>
                  )}
                </div>
                <div className="arrow-icon">→</div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="marquee-container">
        <div className="marquee-content" ref={marqueeRef}>
          {/* Duplicated content for seamless loop */}
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="marquee-item">START A PROJECT</span>
              <span className="marquee-item">SAY HELLO</span>
              <span className="marquee-item">JOIN THE TEAM</span>
              <span className="marquee-item">DIGITAL ALCHEMY</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
