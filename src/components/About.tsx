import React, { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Draggable, ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const proxyRef = useRef<HTMLDivElement>(document.createElement("div"));

  // Artist & Partners Data
  const artist = {
    name: "MO",
    role: "LEAD ARTIST & INSTRUCTOR",
    img: "https://images.unsplash.com/photo-1596462502278-27d4435e6452?w=800&q=80&auto=format&fit=crop",
  };

  const partners = [
    {
      name: "COSTUME BY MO",
      role: "STYLING PARTNER",
      img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=80&auto=format&fit=crop",
    },
    {
      name: "UNCLE MO STUDIO",
      role: "PHOTOGRAPHY",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      text: "I've never felt more beautiful! MO understood exactly what I wanted and created a look that was both timeless and stunning.",
      author: "SARAH, BRIDE",
    },
    {
      text: "Professional, punctual, and incredibly talented. The makeup was sophisticated and appropriate for the event.",
      author: "CHIAMAKA, EVENT CLIENT",
    },
    {
      text: "The instruction was clear, patient, and so informative. I learned techniques I never would have figured out on my own.",
      author: "JESSICA, STUDENT",
    },
  ];

  // Draggable & Skew Logic
  useLayoutEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const content = contentRef.current;
    const proxy = proxyRef.current;
    const sections = gsap.utils.toArray<HTMLElement>(".section");
    const images = gsap.utils.toArray<HTMLImageElement>(".parallax-img");

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Set initial width
    const updateWidth = () => {
      const width = isMobile
        ? window.innerWidth * sections.length
        : content.scrollWidth;
      proxy.style.width = `${width}px`;

      // On mobile, switch to vertical scroll
      if (isMobile) {
        content.style.width = "100vw";
        content.style.height = "auto";
        content.style.flexDirection = "column";
        sections.forEach((section) => {
          (section as HTMLElement).style.minWidth = "100vw";
          (section as HTMLElement).style.width = "100vw";
        });
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);

    // Skew Setter - disable on mobile for performance
    const setSkewX = isMobile
      ? () => {}
      : gsap.quickSetter(content, "skewX", "deg");
    const setX = isMobile ? () => {} : gsap.quickSetter(content, "x", "px");

    // Animation Loop
    let currentX = 0;
    let targetX = 0;

    // Draggable - only on desktop
    if (!isMobile && !isTouch) {
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
    }

    // Mouse Wheel - only on desktop
    const onWheel = (e: WheelEvent) => {
      if (isMobile || isTouch) return;

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

      // Update proxy position for sync
      gsap.set(proxy, { x: newX });
      targetX = newX;

      // Update Draggable internal state
      draggable.update();
    };

    if (!isMobile && !isTouch) {
      window.addEventListener("wheel", onWheel, { passive: true });
    }

    // Render Loop
    const render = () => {
      if (!isMobile) {
        currentX = gsap.utils.interpolate(currentX, targetX, 0.25);

        // Apply skew based on velocity - reduced wobble
        const skew = (targetX - currentX) * 0.02;
        setSkewX(skew);
        setX(currentX);
      }

      // Parallax & Reveal Effects
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.left < window.innerWidth && rect.right > 0;

        if (isVisible) {
          // Fade in/up reveal
          gsap.to(section.querySelectorAll(".reveal-text"), {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            overwrite: "auto",
          });
        }
      });

      // Parallax for images - disable on mobile for performance
      if (!isMobile) {
        images.forEach((img) => {
          const rect = img.parentElement?.getBoundingClientRect();
          if (rect && rect.left < window.innerWidth && rect.right > 0) {
            const moveX = (rect.left / window.innerWidth) * 50;
            gsap.set(img, { x: moveX, scale: 1.1 });
          }
        });
      }

      requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", updateWidth);
      if (!isMobile && !isTouch) {
        window.removeEventListener("wheel", onWheel);
        Draggable.get(proxy)?.kill();
      }
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
      <div
        className="scroll-content"
        ref={contentRef}
        style={{ display: "flex", height: "100vh", padding: "0 10vw" }}
      >
        {/* Section 1: Hero - Creative "Split & Reveal" */}
        <div
          className="section"
          style={{
            minWidth: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            padding: "0 5vw",
            overflow: "hidden",
            backgroundColor: "#0a0a0a",
          }}
          onMouseMove={(e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            gsap.to(".hero-float", {
              x: x,
              y: y,
              duration: 1,
              ease: "power2.out",
            });
            gsap.to(".hero-inverse", {
              x: -x,
              y: -y,
              duration: 1.2,
              ease: "power2.out",
            });
          }}
        >
          {/* Background Texture/Gradient Mesh */}
          <div
            style={{
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "radial-gradient(circle at 50% 50%, rgba(166, 75, 35, 0.05), transparent 60%)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          {/* Top Label */}
          <div
            className="reveal-text"
            style={{
              position: "absolute",
              top: "12vh",
              left: "5vw",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              style={{
                width: "40px",
                height: "1px",
                background: "var(--color-gold)",
              }}
            />
            Beauty Reimagined
          </div>

          {/* Main Typography Composition - Structured/Editorial */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Row 1: TRANSFORMING */}
            <div
              className="hero-row"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "2vh",
                marginBottom: "2vh",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <h1
                className="reveal-text hero-inverse"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12vw",
                  margin: 0,
                  lineHeight: 0.8,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                  letterSpacing: "-0.02em",
                }}
              >
                TRANSFORMING
              </h1>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  color: "var(--color-gold)",
                  marginBottom: "1rem",
                }}
              >
                (01)
              </span>
            </div>

            {/* Row 2: FACES (with Image Reveal) */}
            <div
              className="hero-row"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "2vh",
                marginBottom: "2vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.9rem",
                  color: "var(--color-gold)",
                  marginBottom: "1rem",
                  alignSelf: "flex-end",
                }}
              >
                (02)
              </span>
              <h1
                className="reveal-text hero-float"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12vw",
                  margin: 0,
                  lineHeight: 0.8,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                FACES
                {/* <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%) rotate(-5deg)",
                    width: "120%",
                    height: "120%",
                    background: `url(${artist.img}) center/cover no-repeat`,
                    opacity: 0.3,
                    mixBlendMode: "overlay",
                    pointerEvents: "none",
                    zIndex: -1,
                    filter: "grayscale(100%) contrast(1.2)",
                  }}
                /> */}
              </h1>
            </div>

            {/* Row 3: CONFIDENCE */}
            <div
              className="hero-row"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "2vh",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <h1
                className="reveal-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12vw",
                  margin: 0,
                  lineHeight: 0.8,
                  color: "transparent",
                  WebkitTextStroke: "1px var(--color-gold)",
                  letterSpacing: "-0.02em",
                  opacity: 0.8,
                }}
              >
                CONFIDENCE
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  maxWidth: "20vw",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    color: "var(--color-gold)",
                    marginBottom: "0.5rem",
                  }}
                >
                  (03)
                </span>
                <p
                  style={{
                    fontFamily: "PPNeueMontreal, sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.6)",
                    textAlign: "right",
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  Revealing the inner beauty through expert artistry and
                  personalized care.
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Decoration - Right Side */}
          <div
            className="reveal-text"
            style={{
              position: "absolute",
              right: "5vw",
              top: "20vh",
              height: "60vh",
              width: "1px",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "2vh 0",
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-mono)",
                writingMode: "vertical-rl",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              SCROLL TO DISCOVER
            </span>
            <div
              style={{
                width: "1px",
                height: "10vh",
                background: "var(--color-gold)",
              }}
            />
          </div>
        </div>

        {/* Section 2: The Artist & Philosophy - Unified Editorial Card */}
        <div
          className="section"
          style={{
            minWidth: "80vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "0 5vw",
          }}
        >
          {/* Background Decorative Text */}
          <div
            style={{
              position: "absolute",
              top: "15%",
              right: "0",
              fontFamily: "var(--font-display)",
              fontSize: "15vw",
              lineHeight: 0.8,
              color: "transparent",
              WebkitTextStroke: "1px rgba(255,255,255,0.03)",
              zIndex: 0,
              pointerEvents: "none",
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            PHILOSOPHY
          </div>

          <div
            className="artist-card reveal-text"
            style={{
              position: "relative",
              width: "50vw",
              height: "75vh",
              overflow: "hidden",
              cursor: "none", // Custom cursor feel (if we had one, but standard is fine)
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay =
                e.currentTarget.querySelector(".gradient-overlay");
              const text = e.currentTarget.querySelector(".philosophy-content");

              if (img) {
                img.style.filter = "grayscale(0%) contrast(1.1)";
                img.style.transform = "scale(1.05)";
              }
              if (overlay) {
                (overlay as HTMLElement).style.opacity = "0.8";
              }
              if (text) {
                (text as HTMLElement).style.transform = "translateY(0)";
                (text as HTMLElement).style.opacity = "1";
              }
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              const overlay =
                e.currentTarget.querySelector(".gradient-overlay");
              const text = e.currentTarget.querySelector(".philosophy-content");

              if (img) {
                img.style.filter = "grayscale(100%) contrast(1.2)";
                img.style.transform = "scale(1)";
              }
              if (overlay) {
                (overlay as HTMLElement).style.opacity = "0.6";
              }
              if (text) {
                (text as HTMLElement).style.transform = "translateY(10px)";
                (text as HTMLElement).style.opacity = "0.9";
              }
            }}
          >
            {/* Image */}
            <img
              src={artist.img}
              alt={artist.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(100%) contrast(1.2)",
                transition:
                  "filter 0.8s ease, transform 1.2s cubic-bezier(0.19, 1, 0.22, 1)",
                transformOrigin: "center 30%",
              }}
            />

            {/* Gradient Overlay */}
            <div
              className="gradient-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, #000 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
                opacity: 0.6,
                transition: "opacity 0.8s ease",
              }}
            />

            {/* Content Overlay */}
            <div
              className="philosophy-content"
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "3rem",
                boxSizing: "border-box",
                transform: "translateY(10px)",
                opacity: 0.9,
                transition: "all 0.8s cubic-bezier(0.19, 1, 0.22, 1)",
              }}
            >
              {/* Quote Mark */}
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "8rem",
                  color: "var(--color-gold)",
                  opacity: 0.2,
                  lineHeight: 0,
                  marginBottom: "2rem",
                  marginLeft: "-1rem",
                }}
              >
                “
              </div>

              {/* Main Text */}
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5vw",
                  lineHeight: "1.1",
                  color: "#fff",
                  margin: "0 0 2rem 0",
                  maxWidth: "90%",
                }}
              >
                I believe makeup should{" "}
                <span style={{ color: "var(--color-gold)" }}>ENHANCE</span>{" "}
                <span
                  style={{
                    textDecoration: "line-through",
                    textDecorationColor: "rgba(255,255,255,0.5)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  mask
                </span>
                . My approach centers on celebrating individual features while
                creating{" "}
                <span
                  style={{
                    borderBottom: "1px solid var(--color-gold)",
                    paddingBottom: "2px",
                  }}
                >
                  polished, sophisticated looks
                </span>
                .
              </p>

              {/* Artist Tag */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: "1.5rem",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.5rem",
                      fontWeight: 900,
                    }}
                  >
                    {artist.name}
                  </div>
                  <div
                    style={{
                      width: "1px",
                      height: "20px",
                      background: "var(--color-gold)",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8rem",
                      letterSpacing: "0.1em",
                      opacity: 0.8,
                    }}
                  >
                    {artist.role}
                  </div>
                </div>

                {/* Decorative arrow or icon */}
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-gold)",
                    fontSize: "1.2rem",
                  }}
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Partners - Grid Layout */}
        <div
          className="section"
          style={{
            minWidth: "60vw",
            height: "100vh",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            padding: "0 5vw",
          }}
        >
          {partners.map((member, i) => (
            <div
              key={i}
              className="team-card reveal-text"
              style={{ width: "25vw", position: "relative" }}
            >
              <div
                style={{
                  marginBottom: "1rem",
                  borderBottom: "1px solid rgba(255,255,255,0.2)",
                  paddingBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8rem",
                    opacity: 0.5,
                  }}
                >
                  0{i + 2}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    color: "var(--color-gold)",
                  }}
                >
                  PARTNER
                </span>
              </div>
              <img
                src={member.img}
                alt={member.name}
                loading="lazy"
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  filter: "sepia(20%) brightness(0.9)",
                  marginBottom: "1rem",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8rem",
                  opacity: 0.7,
                }}
              >
                {member.role}
              </div>
            </div>
          ))}
        </div>

        {/* Section 4.5: Testimonials - Masonry Style */}
        <div
          className="section"
          style={{
            minWidth: "50vw",
            height: "70vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 5vw",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            {/* Ambient Gradient */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "60vw",
                height: "60vw",
                background:
                  "radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)",
                filter: "blur(40px)",
                zIndex: -1,
              }}
            />

            {/* "LOVE" - Elegant Typography */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                pointerEvents: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "5vh 2vw",
              }}
            >
              {/* LOVE - Top Left */}
              <h2
                className="reveal-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "18vw",
                  margin: 0,
                  lineHeight: 0.8,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.08)",
                  transform: "translateX(-2vw)",
                  letterSpacing: "-0.05em",
                }}
              >
                LOVE
              </h2>

              {/* NOTES - Bottom Right */}
              <h2
                className="reveal-text"
                style={{
                  // fontFamily: "var(--font-display)",
                  // fontSize: "18vw",
                  // margin: 0,
                  // lineHeight: 0.8,
                  // color: "transparent",
                  // WebkitTextStroke: "0.5px var(--color-gold)",
                  // opacity: 0.08,
                  // transform: "translateX(2vw)",
                  // letterSpacing: "-0.05em",

                  fontFamily: "var(--font-display)",
                  alignSelf: "flex-end",
                  fontSize: "18vw",
                  margin: 0,
                  lineHeight: 0.8,
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.08)",
                  transform: "translateX(-12vw)",
                  letterSpacing: "-0.05em",
                }}
              >
                NOTES
              </h2>
            </div>

            {/* Decorative Line */}
            <div
              className="reveal-text"
              style={{
                position: "absolute",
                top: "20%",
                left: "15%",
                bottom: "20%",
                width: "1px",
                background:
                  "linear-gradient(to bottom, transparent, var(--color-gold), transparent)",
                opacity: 0.3,
                zIndex: -1,
              }}
            />

            {/* Editorial Elements */}
            <div
              className="reveal-text"
              style={{
                position: "absolute",
                top: "15vh",
                right: "5vw",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                color: "var(--color-gold)",
                writingMode: "vertical-rl",
                opacity: 0.6,
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <span>CLIENT STORIES</span>
              <div
                style={{
                  height: "40px",
                  width: "1px",
                  background: "var(--color-gold)",
                }}
              />
              <span>VOL. 01</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            {testimonials.map((note, i) => (
              <div
                key={i}
                className="reveal-text"
                style={{
                  marginLeft: i % 2 === 0 ? "0" : "10vw",
                  maxWidth: "35vw",
                  borderLeft: "1px solid var(--color-gold)",
                  paddingLeft: "2rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    lineHeight: "1.3",
                    marginBottom: "1rem",
                    fontStyle: "normal",
                  }}
                >
                  "{note.text}"
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "1px",
                      background: "#fff",
                      opacity: 0.3,
                    }}
                  ></span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {note.author}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Marquee/Services - Giant Outline */}
        <div
          style={{ minWidth: "60vw", height: "100vh" }}
          className="section about-marquee-section"
        >
          <div
            style={{
              display: "flex",
              gap: "8vw",
              whiteSpace: "nowrap",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            {["BRIDAL", "EDITORIAL", "EVENTS"].map((item, i) => (
              <span
                key={i}
                className="marquee-item reveal-text"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12vw",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.webkitTextStroke = "0px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "transparent";
                  e.currentTarget.style.webkitTextStroke =
                    "1px rgba(255,255,255,0.3)";
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Section 6: Footer/Contact - Clean Minimal */}
        <div
          className="section"
          style={{
            minWidth: "50vw",
            paddingRight: "10vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              marginBottom: "2rem",
              fontSize: "0.9rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
            }}
          >
            Start Your Journey
          </div>
          <a
            href="tel:+2348160601219"
            className="footer-link reveal-text"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "5vw",
              lineHeight: "1",
              textDecoration: "none",
              color: "#fff",
              display: "inline-block",
              transition: "color 0.3s ease",
            }}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-gold)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            BOOK YOUR
            <br />
            SESSION
          </a>
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              gap: "3rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              opacity: 0.7,
            }}
          >
            <a
              href="https://www.instagram.com/motouch_beauty_empire"
              style={{
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-gold)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "inherit";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              INSTAGRAM
            </a>
            <a
              href="https://www.tiktok.com/@anambrabiggestvendor"
              style={{
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-gold)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "inherit";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              TIKTOK
            </a>
            <a
              href="mailto:saint4amos@gmail.com"
              style={{
                color: "inherit",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-gold)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "inherit";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              EMAIL
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
