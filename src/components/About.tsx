/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import Header from "./layout/Header.js";
import Marquee from "./layout/Marquee.js";
import ContentCard from "./layout/ContentCard.js";
import SectionFooter from "./layout/SectionFooter";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger);

// Styled Components for About Page
const AboutPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0a0a0a;
  color: #e0e0e0;
  font-family: "PPNeueMontreal", sans-serif;
  padding: 120px 5vw 5vw 5vw;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  cursor: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const DividerLine = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const AboutListSection = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 4rem;

  &.testimonials-section {
    margin-top: 6rem;
    margin-bottom: 0;
  }
`;

const AboutList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  z-index: 2;
  margin-bottom: 0;
`;

const SectionSubtitle = styled.div`
  margin-bottom: 2rem;
  padding-left: 0;
`;

const ArtistProfile = styled.div`
  gap: 1.5rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
  padding: 1.5rem 3.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover .artist-img-container {
    transform: scale(1.05);
    border-color: var(--color-gold) !important;
  }

  &:hover .artist-img {
    filter: grayscale(0%);
  }
`;

const ArtistImgContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  background-color: rgba(255, 255, 255, 0.05);
`;

const ArtistImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
  display: block;
`;

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const ArtistName = styled.div`
  font-family: "PPNeueMontreal", sans-serif;
  font-size: 1.8rem;
  color: #fff;
  line-height: 1.1;
`;

const ArtistRole = styled.div`
  font-family: "TheGoodMonolith", monospace;
  font-size: 0.8rem;
  color: var(--color-gold);
  opacity: 0.8;
  margin-top: 0.25rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
`;

const PhilosophySection = styled.div`
  position: relative;
  padding: 15vh 0;
  overflow: hidden;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    padding: 5vh 0;
    margin-bottom: 2rem;
  }
`;

const PhilosophyContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 5vw;
`;

const PhilosophyTitle = styled.div`
  font-family: "TheGoodMonolith", monospace;
  color: var(--color-gold);
  letter-spacing: 0.2em;
  margin-bottom: 3rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    width: 30px;
    height: 1px;
    background: var(--color-gold);
  }
`;

const PhilosophyText = styled.h2`
  color: #fff;
  max-width: 85%;
  line-height: 1.15;
  margin: 0 auto 4rem;
  text-wrap: balance;
  font-size: clamp(2rem, 4.5vw, 4.5rem);
  font-family: "PPNeueMontreal", sans-serif;

  @media (max-width: 768px) {
    margin: 0 auto 1rem;
    font-size: clamp(1.8rem, 3vw, 3rem);
    max-width: 100%;
  }

  .confidence-text {
    color: transparent;
    -webkit-text-stroke: 1px var(--color-gold);
    font-weight: 300;
  }

  .flawless-looks {
    position: relative;
    display: inline-block;
  }
`;

const OnlineIndicator = styled.div`
  position: absolute;
  bottom: 2;
  right: 8;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-gold);
  border: 3px solid #0a0a0a;
  z-index: 2;
`;

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activePartner, setActivePartner] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState<number | null>(
    null,
  );
  const [imageError, setImageError] = useState(false);

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
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AboutPageContainer ref={containerRef}>
      <Header
        subtitle="// ABOUT_MO"
        titleLine1="REIMAGINE"
        titleLine2="BEAUTY"
      />

      {/* Philosophy Section - Creative Layout */}
      <PhilosophySection className="about-content-block philosophy-section">
        <DividerLine />
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

        <PhilosophyContent>
          <PhilosophyTitle>
            <span />
            THE ART OF BEAUTY
            <span />
          </PhilosophyTitle>

          <PhilosophyText>
            "My artistry goes beyond makeup; it's about inspiring{" "}
            <span className="confidence-text">CONFIDENCE</span>. By merging
            technical mastery with an editorial eye, I craft{" "}
            <span className="flawless-looks">
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
          </PhilosophyText>

          <ArtistProfile className="artist-profile">
            <div style={{ position: "relative" }}>
              <ArtistImgContainer className="artist-img-container">
                <ArtistImg
                  src={imageError ? artist.fallbackImg : artist.img}
                  alt={artist.name}
                  loading="lazy"
                  className="artist-img"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
              </ArtistImgContainer>
              <OnlineIndicator />
            </div>
            <ArtistInfo>
              <ArtistName>{artist.name}</ArtistName>
              <ArtistRole>{artist.role}</ArtistRole>
            </ArtistInfo>
          </ArtistProfile>
        </PhilosophyContent>
      </PhilosophySection>

      {/* Partners List */}
      <AboutListSection>
        <SectionSubtitle className="about-header-text">
          // OUR_PARTNERS
        </SectionSubtitle>
        <AboutList className="about-list">
          {partners.map((partner, index) => (
            <ContentCard
              key={partner.id}
              index={index}
              content={{
                id: partner.id,
                tags: partner.tags,
                title: partner.name,
                desc: `${partner.title} — ${partner.desc}`,
              }}
              onMouseEnter={setActivePartner}
              className="about-item list-item"
              isActive={activePartner === index}
              onMouseLeave={() => setActivePartner(null)}
              isDimmed={activePartner !== null && activePartner !== index}
            />
          ))}
          <DividerLine style={{ top: "auto", bottom: 0 }} />
        </AboutList>
      </AboutListSection>

      {/* Testimonials List */}
      <AboutListSection
        className="about-list-section testimonials-section"
        style={{ marginTop: "20vh" }}
      >
        <SectionSubtitle className="page-subtitle about-header-text section-subtitle">
          // CLIENT_TESTIMONIALS
        </SectionSubtitle>
        <AboutList className="about-list">
          {testimonials.map((test, index) => (
            <ContentCard
              key={test.id}
              index={index}
              content={test}
              variant="testimonial"
              className="about-item list-item"
              onMouseEnter={setActiveTestimonial}
              isActive={activeTestimonial === index}
              onMouseLeave={() => setActiveTestimonial(null)}
              isDimmed={
                activeTestimonial !== null && activeTestimonial !== index
              }
            />
          ))}
        </AboutList>
      </AboutListSection>

      {/* Marquee Section */}
      <Marquee
        items={[
          "BEAUTY REIMAGINED",
          "TRANSFORMING FACES",
          "REVEALING CONFIDENCE",
          "POLISHED LOOKS",
        ]}
        repetitions={4}
      />
      <SectionFooter text="// END_OF_ABOUT" />
    </AboutPageContainer>
  );
};

export default About;
