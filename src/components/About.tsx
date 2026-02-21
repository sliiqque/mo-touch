import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(document.createElement("div"));

  // Team Data
  const team = [
    {
      name: "ALEX RIVERA",
      role: "DIR. / VISUAL",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "SARAH CHEN",
      role: "DEV. / LOGIC",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "MARCUS J.",
      role: "UX / SENSE",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "ELENA ROD.",
      role: "STRAT. / MIND",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Draggable & Skew Logic
  useLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const content = contentRef.current;
    const proxy = proxyRef.current;

    // Set initial width
    const updateWidth = () => {
      const width = content.scrollWidth;
      // Ensure proxy has enough width to drag
      proxy.style.width = `${width}px`;
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    // Skew Setter
    const setSkewX = gsap.quickSetter(content, "skewX", "deg");
    const setX = gsap.quickSetter(content, "x", "px");

    // Animation Loop
    let currentX = 0;
    let targetX = 0;

    // Draggable
    Draggable.create(proxy, {
      type: "x",
      trigger: containerRef.current,
      inertia: true,
      edgeResistance: 0.65,
      bounds: { minX: window.innerWidth - content.scrollWidth, maxX: 0 },
      onDrag: function () {
        targetX = this.x;
      },
      onThrowUpdate: function () {
        targetX = this.x;
      },
    });

    // Mouse Wheel
    const onWheel = (e: WheelEvent) => {
      const draggable = Draggable.get(proxy);
      if (!draggable) return;

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      let newX = draggable.x - delta * 1.5;

      // Clamp
      const minX = draggable.minX;
      const maxX = draggable.maxX;
      if (newX > maxX) newX = maxX;
      if (newX < minX) newX = minX;

      // Force update draggable
      gsap.set(proxy, { x: newX });
      draggable.update();
      targetX = newX;
    };
    window.addEventListener("wheel", onWheel, { passive: false });

    // Ticker for smooth interpolation and skew
    const tickHandler = () => {
      // Lerp for smooth follow
      currentX += (targetX - currentX) * 0.1;
      setX(currentX);

      // Skew based on velocity
      const velocity = targetX - currentX;
      const skewVal = velocity * 0.01; // Further reduced sensitivity
      setSkewX(Math.max(Math.min(skewVal, 2), -2)); // Further reduced clamp
    };
    gsap.ticker.add(tickHandler);

    // Initial Animation - with better timing and fallback
    const initAnimations = () => {
      gsap.fromTo(
        ".reveal-text",
        { y: 100, opacity: 0, rotate: 5 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
        },
      );
    };

    // Ensure animations run after component is mounted
    const timer = setTimeout(initAnimations, 100);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tickHandler);
      window.removeEventListener("resize", updateWidth);
      window.removeEventListener("wheel", onWheel);
      const draggable = Draggable.get(proxy);
      if (draggable) draggable.kill();
    };
  }, []);

  // Fallback animation for page reload
  useEffect(() => {
    const timer = setTimeout(() => {
      // Ensure elements are visible even if GSAP fails
      const revealElements = document.querySelectorAll(".reveal-text");
      revealElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0) rotate(0)";
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-page" ref={containerRef}>
      <div className="scroll-content" ref={contentRef}>
        {/* Section 1: Hero */}
        <div className="section">
          <h1 className="hero-text reveal-text">
            DIGITAL{" "}
            <span style={{ color: "#fff", WebkitTextStroke: "0" }}>
              ALCHEMY
            </span>
          </h1>
          <h1 className="hero-text reveal-text" style={{ marginLeft: "10vw" }}>
            FOR THE <span className="outline-text">BOLD</span>
          </h1>
        </div>

        {/* Section 2: Manifesto */}
        <div className="section">
          <p className="manifesto-text reveal-text">
            We don't just build websites.
            <br />
            We construct{" "}
            <span style={{ color: "#A64B23" }}>digital cathedrals</span>.<br />
            Brutalist structures for
            <br />
            complex ideas.
          </p>
        </div>

        {/* Section 3: The Squad */}
        <div className="section">
          <h2
            style={{
              fontFamily: "TheGoodMonolith, monospace",
              fontSize: "2rem",
              marginBottom: "2rem",
              opacity: 0.6,
            }}
          >
            // THE_OPERATORS
          </h2>
          <div className="team-container">
            {team.map((member, i) => (
              <div key={i} className="team-card reveal-text">
                <img src={member.img} alt={member.name} />
                <div className="team-info">
                  <div className="team-name">{member.name}</div>
                  <div className="team-role">{member.role}</div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    fontFamily: "TheGoodMonolith, monospace",
                    fontSize: "1.5rem",
                    mixBlendMode: "difference",
                  }}
                >
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Marquee/Services */}
        <div className="section about-marquee-section">
          {["STRATEGY", "DESIGN", "DEVELOPMENT", "MOTION", "3D_VISUALS"].map(
            (item, i) => (
              <span key={i} className="marquee-item reveal-text">
                {item}
              </span>
            ),
          )}
        </div>

        {/* Section 5: Footer/Contact */}
        <div className="section" style={{ paddingRight: "15vw" }}>
          <div
            style={{
              fontFamily: "TheGoodMonolith, monospace",
              marginBottom: "2rem",
            }}
          >
            READY_TO_DEPLOY?
          </div>
          <a
            href="mailto:hello@mo-touch.com"
            className="footer-link reveal-text"
          >
            HELLO@MO-TOUCH.COM
          </a>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              gap: "2rem",
              fontFamily: "TheGoodMonolith, monospace",
            }}
          >
            <span style={{ cursor: "pointer" }}>INSTAGRAM</span>
            <span style={{ cursor: "pointer" }}>TWITTER</span>
            <span style={{ cursor: "pointer" }}>LINKEDIN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
