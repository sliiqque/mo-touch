import { useUI } from "../../context/UIContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";

// Internal styles for Navbar component
const navbarStyles = `
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 1.5rem 2rem;
    z-index: 10000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    color: var(--color-text);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  .header > * {
    pointer-events: auto;
  }

  .nav-section.logo-area {
    flex: 0 0 auto;
  }

  .marquee-section {
    flex: 1;
    overflow: hidden;
    margin: 0 4rem;
    opacity: 0.8;
    font-family: "Space Grotesk", sans-serif;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    white-space: nowrap;
    mask-image: linear-gradient(
      to right,
      transparent,
      black 20%,
      black 80%,
      transparent
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 20%,
      black 80%,
      transparent
    );
  }

  .marquee-wrapper {
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

  .values-section.nav-area {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .time-display {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.75rem;
    opacity: 0.6;
    letter-spacing: 0.05em;
  }

  .nav-area ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .nav-link {
    font-family: "Space Grotesk", sans-serif;
    font-size: 0.85rem;
    text-decoration: none;
    color: var(--color-text);
    position: relative;
    display: block;
    letter-spacing: 0.05em;
    transition: opacity 0.3s ease;
  }

  .logo-container {
    margin-bottom: var(--spacing-md);
    display: block;
    width: 3rem;
    height: 0.5rem;
    position: relative;
    cursor: pointer;
    text-align: center;
  }

  .logo-circles {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .circle {
    position: absolute;
    border-radius: 50%;
    transition: transform var(--transition-medium);
    width: 1.4rem;
    height: 1.4rem;
    background-color: var(--color-text);
    top: 50%;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  .circle-1 {
    left: 0;
    transform: translate(0, -50%);
  }

  .circle-2 {
    left: 0.8rem;
    transform: translate(0, -50%);
    mix-blend-mode: exclusion;
  }

  .logo-container:hover .circle-1 {
    transform: translate(-0.5rem, -50%);
  }

  .logo-container:hover .circle-2 {
    transform: translate(0.5rem, -50%);
  }

  @media (max-width: 768px) {
    .header {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
      background: linear-gradient(to bottom, rgba(9, 9, 11, 0.8), transparent);
    }

    .marquee-section,
    .time-display {
      display: none;
    }

    .nav-section,
    .values-section {
      grid-column: auto !important;
      text-align: left !important;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .nav-section.logo-area {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .values-section ul {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      text-align: center;
    }

    .logo-container {
      // margin: 0 auto 0.5rem;
    }
  }
`;

gsap.registerPlugin(ScrollTrigger);

const Navbar: React.FC = () => {
  const { isZoomed } = useUI();
  const location = useLocation();
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const [time, setTime] = useState("");

  // Inject styles into head
  useEffect(() => {
    const styleId = "navbar-styles";
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = navbarStyles;
      document.head.appendChild(styleElement);
    }

    return () => {
      // Clean up styles when component unmounts
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Time update
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      setTime(
        date.toLocaleTimeString("en-US", {
          timeZone: "Africa/Lagos",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }) + " NG",
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2,
      });

      // Logo hover animation
      if (logoRef.current) {
        logoRef.current.addEventListener("mouseenter", () => {
          gsap.to(".circle-1", {
            scale: 1.5,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
          gsap.to(".circle-2", {
            scale: 0.5,
            duration: 0.3,
            ease: "back.out(1.7)",
          });
        });
        logoRef.current.addEventListener("mouseleave", () => {
          gsap.to(".circle-1", { scale: 1, duration: 0.3 });
          gsap.to(".circle-2", { scale: 1, duration: 0.3 });
        });
      }

      // Marquee animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          xPercent: -33.33,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }

      // Link hover animations
      const links = document.querySelectorAll(".nav-link");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, { y: -2, duration: 0.2 });
          // Dim others
          gsap.to(links, { opacity: 0.3, duration: 0.2, overwrite: true });
          gsap.to(link, { opacity: 1, duration: 0.2, overwrite: true });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, { y: 0, duration: 0.2 });
          gsap.to(links, { opacity: 1, duration: 0.2 });
        });
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="header" ref={headerRef}>
      {/* Left: Logo */}
      <div className="nav-section logo-area">
        <div
          style={{
            pointerEvents: isZoomed ? "none" : "auto",
            opacity: isZoomed ? 0.3 : 1,
            transition: "opacity 0.3s",
          }}
          ref={logoRef}
          className="logo-container"
        >
          <Link to="/">
            <div className="logo-circles">
              <div className="circle circle-1"></div>
              <div className="circle circle-2"></div>
            </div>
          </Link>
        </div>
      </div>

      {/* Center: Marquee (Desktop only) */}
      {!isMobile && (
        <div className="marquee-section">
          <div className="marquee-wrapper">
            <div className="marquee-content" ref={marqueeRef}>
              <span>BRIDAL MAKEUP • </span>
              <span>EDITORIAL • </span>
              <span>INSTRUCTION • </span>
              <span>SPECIAL FX • </span>
              <span>TRANSFORMING FACES • </span>
              <span>BRIDAL MAKEUP • </span>
              <span>EDITORIAL • </span>
              <span>INSTRUCTION • </span>
              <span>SPECIAL FX • </span>
              <span>TRANSFORMING FACES • </span>
              <span>BRIDAL MAKEUP • </span>
              <span>EDITORIAL • </span>
              <span>INSTRUCTION • </span>
              <span>SPECIAL FX • </span>
              <span>TRANSFORMING FACES • </span>
            </div>
          </div>
        </div>
      )}

      {/* Right: Navigation & Time */}
      <div className="values-section nav-area">
        <div className="time-display">{time}</div>
        <ul
          ref={menuRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s",
            opacity: isZoomed ? 0.3 : 1,
            pointerEvents: isZoomed ? "none" : "auto",
          }}
        >
          {["Work", "About", "Services", "Contact"].map((item) => {
            const path = item === "Work" ? "/" : `/${item.toLowerCase()}`;
            return (
              <li key={item}>
                <Link
                  to={path}
                  className="nav-link"
                  style={{
                    textDecoration: isActive(path) ? "line-through" : "none",
                    fontWeight: isActive(path) ? "bold" : "normal",
                  }}
                >
                  {item.toUpperCase()}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
