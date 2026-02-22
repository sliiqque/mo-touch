import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useUI } from "../../context/UIContext";

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
          className="logo-container"
          ref={logoRef}
          style={{
            pointerEvents: isZoomed ? "none" : "auto",
            opacity: isZoomed ? 0.3 : 1,
            transition: "opacity 0.3s",
          }}
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
            pointerEvents: isZoomed ? "none" : "auto",
            opacity: isZoomed ? 0.3 : 1,
            transition: "opacity 0.3s",
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
