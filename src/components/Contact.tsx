import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Header from "./layout/Header";
import Marquee from "./layout/Marquee";
import SectionFooter from "./layout/SectionFooter";
import ContentCard from "./layout/ContentCard";
import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import type { ContactItem } from "../types/layout.js";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contactListRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setActiveItem(index);
  const handleMouseLeave = () => setActiveItem(null);
  const isActive = (index: number) => activeItem === index;
  const isDimmed = (index: number) =>
    activeItem !== null && activeItem !== index;

  const contactItems: ContactItem[] = [
    {
      id: "01",
      value: "08160601219",
      label: "BOOK APPOINTMENT",
      subValue: "WhatsApp booking available",
      link: "https://wa.me/2348160601219?text=Hi%2C%20I%27d%20like%20to%20book%20a%20makeup%20appointment",
    },
    {
      id: "02",
      label: "EMAIL INQUIRIES",
      value: "SAINT4AMOS@GMAIL.COM",
      link: "mailto:saint4amos@gmail.com",
      subValue: "Professional consultations available",
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

  // Styles
  const styles = {
    contactPage: {
      cursor: "none",
      width: "100vw",
      height: "100vh",
      color: "#e0e0e0",
      backgroundColor: "#0a0a0a",
      overflowY: "auto" as const,
      overflowX: "hidden" as const,
      padding: "120px 5vw 5vw 5vw",
      position: "relative" as const,
      scrollbarWidth: "none" as const,
      msOverflowStyle: "none" as const,
      WebkitOverflowScrolling: "touch" as const,
      fontFamily: '"PPNeueMontreal", sans-serif',
    },
    contactList: {
      zIndex: 2,
      width: "100%",
      display: "flex",
      marginBottom: 0,
      position: "relative" as const,
      flexDirection: "column" as const,
    },
  };

  // Hide scrollbar for webkit browsers
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .contact-page::-webkit-scrollbar {
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
      // Header Animation - match Services page style
      const headerElements =
        containerRef.current?.querySelectorAll(".contact-header-text") || [];
      gsap.from(headerElements, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Line animations
      const dividerLines =
        containerRef.current?.querySelectorAll(".divider-line") || [];
      gsap.from(dividerLines, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.1,
        delay: 0.5,
      });

      // Contact items - match Services page style
      const contactElements =
        containerRef.current?.querySelectorAll(".content-item") || [];
      gsap.set(contactElements, { autoAlpha: 0, y: 50 });

      gsap.to(contactElements, {
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
      const headerElements =
        containerRef.current?.querySelectorAll(".contact-header-text") || [];
      const contactElements =
        containerRef.current?.querySelectorAll(".content-item") || [];
      const lineElements =
        containerRef.current?.querySelectorAll(".divider-line") || [];

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
    <div style={styles.contactPage} ref={containerRef}>
      <Header
        subtitle="// CONTACT_MO"
        titleLine1="GET YOUR"
        titleLine2="GLOW UP"
      />

      <div style={styles.contactList} ref={contactListRef}>
        {contactItems.map((item, index) => (
          <ContentCard
            key={item.id}
            index={index}
            content={item}
            variant="contact"
            // className="content-item"
            isActive={isActive(index)}
            isDimmed={isDimmed(index)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      <Marquee
        items={[
          "BOOK BRIDAL CONSULTATION",
          "SCHEDULE MAKEUP SESSION",
          "RESERVE CLASS SPOT",
          "TRANSFORM YOUR LOOK",
        ]}
        repetitions={4}
      />
      <SectionFooter text="// END_OF_CONTACT" />
    </div>
  );
};

export default Contact;
