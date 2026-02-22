import React, { useRef, useLayoutEffect } from "react";
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

  // Header animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-subtitle, .page-title span", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="header-section" ref={headerRef}>
      <div className="page-subtitle" style={{ margin: "1rem 0" }}>
        {subtitle}
      </div>
      <h1 className="page-title">
        <span style={{ margin: "1rem 0" }}>{titleLine1}</span>
        <span
          style={{
            color: "#fff",
            display: "flex",
            WebkitTextStroke: "0",
            justifyContent: "end",
          }}
        >
          {titleLine2}
        </span>
      </h1>
    </div>
  );
};

export default Header;
