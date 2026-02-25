import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import type { MarqueeProps } from "../../types/layout.js";

const Marquee: React.FC<MarqueeProps> = ({
  items,
  repetitions = 4,
  className = "",
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Handle responsive styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        x: "-50%",
        duration: 40,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  // Styles
  const styles = {
    marqueeContainer: {
      width: "100vw",
      overflow: "hidden" as const,
      marginLeft: "-5vw",
      background: "#0a0a0a",
      borderTop: "2px solid rgba(255, 255, 255, 0.4)",
      position: "relative" as const,
      zIndex: 2,
    },
    marqueeContent: {
      display: "flex",
      whiteSpace: "nowrap" as const,
      width: "fit-content",
      alignItems: "center",
    },
    marqueeItem: {
      fontSize: isMobile ? "12vw" : isTablet ? "12vw" : "10vw",
      fontWeight: 900,
      color: "#fff",
      marginRight: "6rem",
      textTransform: "uppercase" as const,
      transition: "color 0.3s",
      WebkitTextStroke: "0",
      lineHeight: "1.4",
    },
    marqueeItemHover: {
      color: "transparent",
      WebkitTextStroke: "1px #a64b23",
    },
    touchDeviceHover: {
      color: "#fff !important",
      WebkitTextStroke: "1px rgba(255, 255, 255, 0.3) !important",
    },
  };

  return (
    <div style={styles.marqueeContainer} className={className}>
      <div ref={marqueeRef} style={styles.marqueeContent}>
        {Array.from({ length: repetitions }, (_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <span
                key={index}
                style={styles.marqueeItem}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.marqueeItemHover);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, styles.marqueeItem);
                }}
              >
                {item}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
