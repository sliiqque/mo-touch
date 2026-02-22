import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import type { MarqueeProps } from "../../types/layout.js";

const Marquee: React.FC<MarqueeProps> = ({
  items,
  repetitions = 4,
  className = "",
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  const containerStyle: React.CSSProperties = {
    width: "100vw",
    overflow: "hidden",
    marginLeft: "-5vw",
    background: "#0a0a0a",
    borderTop: "2px solid rgba(255, 255, 255, 0.4)",
  };

  const contentStyle: React.CSSProperties = {
    display: "flex",
    whiteSpace: "nowrap",
    width: "fit-content",
    alignItems: "center",
  };

  const itemStyle: React.CSSProperties = {
    fontSize: "10vw",
    fontWeight: 900,
    color: "#fff",
    marginRight: "6rem",
    textTransform: "uppercase",
    transition: "color 0.3s",
    WebkitTextStroke: "0",
    lineHeight: "1.4",
  };

  const itemHoverStyle: React.CSSProperties = {
    color: "transparent",
    WebkitTextStroke: "1px #a64b23",
  };

  return (
    <div className={`marquee-container ${className}`} style={containerStyle}>
      <div className="marquee-content" ref={marqueeRef} style={contentStyle}>
        {Array.from({ length: repetitions }, (_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <span
                key={index}
                style={itemStyle}
                className="marquee-item"
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, itemHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, itemStyle);
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
