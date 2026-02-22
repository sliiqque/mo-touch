import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ContactItem {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  link: string;
}

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const contactItems: ContactItem[] = [
    {
      id: "01",
      label: "BOOK APPOINTMENT",
      value: "08160601219",
      subValue: "Response within 24 hours",
      link: "tel:+2348160601219",
    },
    {
      id: "02",
      label: "EMAIL INQUIRIES",
      value: "SAINT4AMOS@GMAIL.COM",
      subValue: "Professional consultations available",
      link: "mailto:saint4amos@gmail.com",
    },
    {
      id: "03",
      label: "INSTAGRAM",
      value: "@MOTOUCH_BEAUTY_EMPIRE",
      subValue: "Daily work updates & portfolio",
      link: "https://www.instagram.com/motouch_beauty_empire",
    },
    {
      id: "04",
      label: "TIKTOK",
      value: "@ANAMBRABIGGESTVENDOR",
      subValue: "Video content & updates",
      link: "https://www.tiktok.com/@anambrabiggestvendor",
    },
    {
      id: "05",
      label: "FACEBOOK",
      value: "MOTOUCH BEAUTY EMPIRE",
      subValue: "Community & announcements",
      link: "https://web.facebook.com/motouchbeautyempire",
    },
    {
      id: "06",
      label: "LOCATION",
      value: "AWKA, ANAMBRA STATE",
      subValue: "Nigeria",
      link: "https://maps.google.com/?q=Awka,Anambra+State,Nigeria",
    },
  ];

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation - match Services page style
      gsap.from(".contact-header-text", {
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

      // Contact items - match Services page style
      gsap.set(".contact-item", { autoAlpha: 0, y: 50 });

      gsap.to(".contact-item", {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
        clearProps: "transform",
      });

      // Marquee Animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          duration: 40,
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
      const headerElements = document.querySelectorAll(".contact-header-text");
      const contactElements = document.querySelectorAll(".contact-item");
      const lineElements = document.querySelectorAll(".divider-line");

      headerElements.forEach((el) => {
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

  return (
    <div className="contact-page" ref={containerRef}>
      <div className="header-section">
        <div className="page-subtitle contact-header-text">// CONTACT_MO</div>
        <h1 className="page-title" style={{ marginTop: "1rem" }}>
          <span className="contact-header-text">START YOUR</span>
          <span
            className="contact-header-text"
            style={{
              color: "#fff",
              display: "flex",
              WebkitTextStroke: "0",
              marginTop: "2rem",
              justifyContent: "end",
            }}
            // style={{ color: "#fff", WebkitTextStroke: "0", marginTop: "2rem" }}
          >
            BEAUTY JOURNEY
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
            <a
              href={item.link}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
            >
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
              <span className="marquee-item">BOOK BRIDAL CONSULTATION</span>
              <span className="marquee-item">SCHEDULE MAKEUP SESSION</span>
              <span className="marquee-item">RESERVE CLASS SPOT</span>
              <span className="marquee-item">TRANSFORM YOUR LOOK</span>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="footer-end-text">// END_OF_CONTACT</div>
    </div>
  );
};

export default Contact;
