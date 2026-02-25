import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";

interface HeaderProps {
  subtitle?: string;
  titleLine1?: string;
  titleLine2?: string;
}

const Header: React.FC<HeaderProps> = ({
  subtitle = "// MO_SERVICES",
  titleLine1 = "LOOK RADIANT,",
  titleLine2 = "FEEL CONFIDENT",
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLSpanElement>(null);
  const title2Ref = useRef<HTMLSpanElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Header animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        subtitleRef.current,
        title1Ref.current,
        title2Ref.current,
      ].filter(Boolean);
      gsap.from(elements, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const styles = {
    headerSection: {
      marginBottom: "8rem",
      position: "relative" as const,
      zIndex: 2,
    },
    pageSubtitle: {
      fontFamily: '"TheGoodMonolith", monospace',
      fontSize: "1.2rem",
      marginTop: "2rem",
      letterSpacing: "0.1em",
      color: "var(--color-gold, #a64b23)",
      margin: "1rem 0",
    },
    pageTitle: {
      fontSize: isMobile ? "15vw" : "9vw",
      lineHeight: "0.85",
      fontWeight: 800,
      textTransform: "uppercase" as const,
      margin: 0,
      color: "transparent",
      WebkitTextStroke: "1px #fff",
      position: "relative" as const,
      zIndex: 1,
    },
    titleSpan: {
      display: "block",
    },
    titleSpan1: {
      margin: "1rem 0",
    },
    titleSpan2: {
      color: "#fff",
      WebkitTextStroke: "0",
      display: isMobile ? "block" : "flex",
      justifyContent: isMobile ? "flex-start" : "end",
    },
  };

  return (
    <div style={styles.headerSection} ref={headerRef}>
      <div style={styles.pageSubtitle} ref={subtitleRef}>
        {subtitle}
      </div>
      <h1 style={styles.pageTitle}>
        <span
          style={{ ...styles.titleSpan, ...styles.titleSpan1 }}
          ref={title1Ref}
        >
          {titleLine1}
        </span>
        <span
          style={{ ...styles.titleSpan, ...styles.titleSpan2 }}
          ref={title2Ref}
        >
          {titleLine2}
        </span>
      </h1>
    </div>
  );
};

export default Header;
