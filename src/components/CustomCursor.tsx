import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.2 });
    };

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.2 });
    };

    // Add hover listeners for interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, .cursor-hover",
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(follower, {
            scale: 2,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            mixBlendMode: "difference",
            duration: 0.3,
          });
          gsap.to(cursor, { opacity: 0, duration: 0.3 });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(follower, {
            scale: 1,
            backgroundColor: "transparent",
            mixBlendMode: "normal",
            duration: 0.3,
          });
          gsap.to(cursor, { opacity: 1, duration: 0.3 });
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Re-bind listeners on route change
    const timeout = setTimeout(addHoverListeners, 500); // Wait for page transition

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      clearTimeout(timeout);
    };
  }, [location.pathname, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "var(--color-accent)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10002,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={followerRef}
        className="custom-cursor-follower"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "40px",
          height: "40px",
          border: "1px solid var(--color-text-muted)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 10001,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s, height 0.3s, border-color 0.3s",
        }}
      />
    </>
  );
};

export default CustomCursor;
