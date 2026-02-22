import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activePartner, setActivePartner] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(
    null,
  );
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Debug: Check if image loads
  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    // Image loaded successfully
  };

  const artist = {
    name: "MO",
    role: "LEAD ARTIST & INSTRUCTOR",
    img: "https://picsum.photos/200/200?random=1", // More reliable image source
    fallbackImg:
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%230a0a0a' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23d4af37'%3EMO%3C/text%3E%3C/svg%3E", // SVG fallback
  };

  const partners = [
    {
      id: "01",
      name: "COSTUME BY MO",
      title: "STYLING PARTNER",
      desc: "Providing complete wardrobe styling and traditional attire for seamless event looks.",
      tags: ["Wardrobe Styling", "Traditional Attire", "Event Coordination"],
    },
    {
      id: "02",
      name: "UNCLE MO STUDIO",
      title: "PHOTOGRAPHY",
      desc: "Capturing beauty and special moments with striking visual artistry.",
      tags: ["Portraits", "Event Coverage", "Editorial Shoots"],
    },
  ];

  const testimonials = [
    {
      id: "T1",
      author: "SARAH, BRIDE",
      text: "I've never felt more beautiful! MO understood exactly what I wanted and created a look that was both timeless and stunning.",
      tags: ["Bridal Makeup", "Timeless Look"],
    },
    {
      id: "T2",
      author: "CHIAMAKA, EVENT CLIENT",
      text: "Professional, punctual, and incredibly talented. The makeup was sophisticated and appropriate for the event.",
      tags: ["Professional", "Sophisticated"],
    },
    {
      id: "T3",
      author: "JESSICA, STUDENT",
      text: "The instruction was clear, patient, and so informative. I learned techniques I never would have figured out on my own.",
      tags: ["Makeup Training", "Clear Instruction"],
    },
  ];

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".about-header-text", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Line animations
      gsap.from(".divider-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "expo.inOut",
        stagger: 0.1,
        delay: 0.5,
      });

      // Item Animations (Philosophy, Artist, Partners, Testimonials)
      gsap.set(".about-content-block, .about-item", { autoAlpha: 0, y: 50 });

      gsap.to(".about-content-block, .about-item", {
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
      const headerElements = document.querySelectorAll(".about-header-text");
      const itemElements = document.querySelectorAll(
        ".about-content-block, .about-item",
      );
      const lineElements = document.querySelectorAll(".divider-line");

      headerElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });

      itemElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });

      lineElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.transform = "scaleX(1)";
      });

      if (marqueeRef.current) {
        marqueeRef.current.style.transform = "translateX(-50%)";
        marqueeRef.current.style.transition = "transform 20s linear infinite";
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-page" ref={containerRef}>
      <div className="header-section">
        <div className="page-subtitle about-header-text">// ABOUT_MO</div>
        <h1 className="page-title">
          <span className="about-header-text">REIMAGINE</span>
          <span
            className="about-header-text"
            style={{
              color: "#fff",
              display: "flex",
              WebkitTextStroke: "0",
              justifyContent: "end",
            }}
          >
            BEAUTY
          </span>
        </h1>
      </div>

      {/* Philosophy Section - Creative Layout */}
      <div
        className="about-content-block philosophy-section"
        style={{ position: "relative", padding: "15vh 0", overflow: "hidden" }}
      >
        <div className="divider-line"></div>

        {/* Abstract Background Elements */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "-10%",
            width: "40vw",
            height: "40vw",
            background:
              "radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)",
            filter: "blur(40px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "-5%",
            width: "30vw",
            height: "30vw",
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
            filter: "blur(40px)",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Decorative Giant Text */}
        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: '"PPNeueMontreal", sans-serif',
            fontSize: "clamp(10rem, 20vw, 25rem)",
            lineHeight: 0.8,
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.03)",
            zIndex: 0,
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          PHILOSOPHY
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "0 5vw",
          }}
        >
          <div
            style={{
              fontFamily: '"TheGoodMonolith", monospace',
              color: "var(--color-gold)",
              letterSpacing: "0.2em",
              marginBottom: "3rem",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span
              style={{
                width: "30px",
                height: "1px",
                background: "var(--color-gold)",
              }}
            />
            THE ART OF BEAUTY
            <span
              style={{
                width: "30px",
                height: "1px",
                background: "var(--color-gold)",
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: '"PPNeueMontreal", sans-serif',
              fontSize: "clamp(2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.15,
              color: "#fff",
              maxWidth: "85%",
              margin: "0 auto 4rem",
              textWrap: "balance" as any,
            }}
          >
            "My artistry goes beyond makeup; it's about inspiring{" "}
            <span
              style={{
                color: "transparent",
                WebkitTextStroke: "1px var(--color-gold)",
                fontWeight: 300,
              }}
            >
              CONFIDENCE
            </span>
            . By merging technical mastery with an editorial eye, I craft{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              flawless, sophisticated looks
              <svg
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
                style={{ position: "absolute", bottom: -4, left: 0 }}
              >
                <path
                  d="M0,5 Q50,0 100,5"
                  stroke="var(--color-gold)"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </span>{" "}
            designed for your most unforgettable moments."
          </h2>

          <div
            className="artist-profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              padding: "1.5rem 3.5rem",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "100px",
              background: "rgba(10,10,10,0.6)",
              backdropFilter: "blur(15px)",
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-gold)";
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4)";
              e.currentTarget.style.background = "rgba(10,10,10,0.8)";
              const imgContainer = e.currentTarget.querySelector(
                ".artist-img-container",
              );
              if (imgContainer)
                (imgContainer as HTMLElement).style.borderColor =
                  "var(--color-gold)";
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(0%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.background = "rgba(10,10,10,0.6)";
              const imgContainer = e.currentTarget.querySelector(
                ".artist-img-container",
              );
              if (imgContainer)
                (imgContainer as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.2)";
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(100%)";
            }}
          >
            <div style={{ position: "relative" }}>
              <div
                className="artist-img-container"
                style={{
                  position: "relative",
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  transition: "transform 0.3s ease, border-color 0.3s ease",
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
                  backgroundColor: "rgba(255, 255, 255, 0.05)", // Debug background
                }}
              >
                <img
                  src={imageError ? artist.fallbackImg : artist.img}
                  alt={artist.name}
                  loading="lazy"
                  className="artist-img"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(100%)",
                    transition: "filter 0.3s ease",
                  }}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 8,
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "var(--color-gold)",
                  border: "3px solid #0a0a0a",
                  zIndex: 2,
                }}
              />
            </div>
            <div style={{ textAlign: "left" }}>
              <div
                style={{
                  fontFamily: '"PPNeueMontreal", sans-serif',
                  fontSize: "1.8rem",
                  color: "#fff",
                  lineHeight: 1.1,
                }}
              >
                {artist.name}
              </div>
              <div
                style={{
                  fontFamily: '"TheGoodMonolith", monospace',
                  fontSize: "0.8rem",
                  color: "var(--color-gold)",
                  opacity: 0.8,
                  marginTop: "0.25rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {artist.role}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners List */}
      <div className="about-list-section partners-section">
        <div className="page-subtitle about-header-text section-subtitle">
          // OUR_PARTNERS
        </div>
        <div className="about-list">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className={`about-item list-item ${
                activePartner !== null && activePartner !== index
                  ? "dimmed"
                  : ""
              }`}
              onMouseEnter={() => setActivePartner(index)}
              onMouseLeave={() => setActivePartner(null)}
            >
              <div className="divider-line"></div>
              <div className="about-content list-content">
                <div className="item-id">{partner.id}</div>
                <div className="item-main">
                  <div className="item-value list-title">{partner.name}</div>
                  <div className="item-subvalue list-desc">
                    {partner.title} — {partner.desc}
                  </div>
                </div>
                <div className="about-tags list-tags">
                  {partner.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="about-tag-item tag-item"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div
            className="divider-line"
            style={{ top: "auto", bottom: 0 }}
          ></div>
        </div>
      </div>

      {/* Testimonials List */}
      <div className="about-list-section testimonials-section">
        <div className="page-subtitle about-header-text section-subtitle">
          // CLIENT_TESTIMONIALS
        </div>
        <div className="about-list">
          {testimonials.map((test, index) => (
            <div
              key={test.id}
              className={`about-item list-item ${
                activeTestimonial !== null && activeTestimonial !== index
                  ? "dimmed"
                  : ""
              }`}
              onMouseEnter={() => setActiveTestimonial(index)}
              onMouseLeave={() => setActiveTestimonial(null)}
            >
              <div className="divider-line"></div>
              <div className="about-content list-content">
                <div className="item-id">{test.id}</div>
                <div className="item-main">
                  <div className="item-subvalue list-quote">"{test.text}"</div>
                  <div className="item-label list-author">// {test.author}</div>
                </div>
                <div className="about-tags list-tags">
                  {test.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="about-tag-item tag-item"
                      style={{ transitionDelay: `${i * 0.05}s` }}
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content" ref={marqueeRef}>
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="marquee-item">BEAUTY REIMAGINED</span>
              <span className="marquee-item">TRANSFORMING FACES</span>
              <span className="marquee-item">REVEALING CONFIDENCE</span>
              <span className="marquee-item">POLISHED LOOKS</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="footer-end-text">// END_OF_ABOUT</div>
    </div>
  );
};

export default About;
