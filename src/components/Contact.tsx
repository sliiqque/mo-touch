import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState<number | null>(null);

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation - remove opacity: 0 to ensure visibility
      gsap.from(".reveal-text", {
        y: 100,
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

      // Contact items - remove autoAlpha: 0 to ensure visibility
      gsap.from(".contact-item", {
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });

      // Marquee Animation
      if (marqueeRef.current) {
        gsap.to(marqueeRef.current, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      id: "01",
      label: "DIRECT_LINE",
      value: "HELLO@MO-TOUCH.COM",
      subValue: "+1 (555) 000-0000",
      link: "mailto:hello@mo-touch.com",
    },
    {
      id: "02",
      label: "HQ_COORDINATES",
      value: "1200 INDUSTRIAL AVE",
      subValue: "SECTOR 7G, NY 10001",
      link: "https://maps.google.com",
    },
    {
      id: "03",
      label: "SOCIAL_FEED",
      value: "INSTAGRAM",
      subValue: "TWITTER / LINKEDIN / BEHANCE",
      link: "https://instagram.com",
    },
  ];

  return (
    <div className="contact-page" ref={containerRef}>
      <style>{`
        .contact-page {
          height: 100vh;
          width: 100vw;
          background-color: #0a0a0a;
          color: #e0e0e0;
          font-family: 'PPNeueMontreal', sans-serif;
          padding: 120px 5vw 40px 5vw;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
          /* Cursor managed by Layout/CustomCursor */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          -webkit-overflow-scrolling: touch;
        }

        .contact-page::-webkit-scrollbar {
            display: none;
        }
        
        .contact-page {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .header-section, .contact-list, .marquee-container {
            position: relative;
            z-index: 2;
        }

        .header-section {
          margin-bottom: 4rem;
        }

        .page-title {
          font-size: 12vw;
          line-height: 0.85;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0;
          color: transparent;
          -webkit-text-stroke: 2px #fff;
          position: relative;
          z-index: 1;
        }
        
        .page-subtitle {
          font-family: 'TheGoodMonolith', monospace;
          font-size: 1.5rem;
          margin-top: 2rem;
          color: #FF5722; /* Brighter orange for visibility */
          letter-spacing: 0.1em;
          display: block;
          font-weight: bold;
        }

        .divider-line {
          height: 2px;
          background: rgba(255, 255, 255, 0.4);
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .contact-list {
            display: flex;
            flex-direction: column;
            width: 100%;
        }

        .contact-item {
            position: relative;
            padding: 4rem 0;
            cursor: pointer; /* Restored pointer cursor for interactive items */
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-item.dimmed {
            opacity: 1;
        }

        .contact-content {
            display: grid;
            grid-template-columns: 1fr 3fr auto;
            align-items: flex-start;
            gap: 2rem;
        }

        .item-id {
            font-family: 'TheGoodMonolith', monospace;
            font-size: 1.8rem;
            font-weight: bold;
        }

        .item-main {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .item-label {
            font-family: 'TheGoodMonolith', monospace;
            font-size: 1.2rem;
            color: #FF5722; /* Brighter orange for visibility */
            margin-bottom: 1rem;
            font-weight: 700;
        }

        .item-value {
            font-size: 6vw;
            font-weight: 900;
            line-height: 1;
            text-transform: uppercase;
            transition: color 0.3s ease, transform 0.3s ease;
            text-shadow: none; /* Remove shadow to ensure sharpness */
        }

        .item-subvalue {
            font-size: 2rem;
            font-weight: 500;
            opacity: 1;
            margin-top: 1rem;
            font-family: 'TheGoodMonolith', monospace;
        }
        
        .contact-link {
            text-decoration: none;
            color: inherit;
            display: block;
        }
        
        .arrow-icon {
            font-size: 5vw;
            color: #FF5722; /* Brighter orange */
            opacity: 1;
            transform: translateX(0);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .contact-item:hover .arrow-icon {
            transform: translateX(10px) scale(1.1);
        }
        
        .marquee-container {
            width: 100%;
            overflow: hidden;
            padding: 12rem 0;
            border-top: 2px solid rgba(255,255,255,0.4);
            margin-top: 3rem;
            background: #0a0a0a;
        }
        
        .marquee-content {
            display: flex;
            white-space: nowrap;
            width: fit-content;
            align-items: center;
        }
        
        .marquee-item {
            font-size: 10vw;
            font-weight: 900;
            color: #fff;
            margin-right: 6rem;
            text-transform: uppercase;
            transition: color 0.3s;
            -webkit-text-stroke: 0;
            line-height: 1.4;
            padding-bottom: 0.2em;
        }
        
        .marquee-item:hover {
            color: transparent;
            -webkit-text-stroke: 1px #A64B23;
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .item-value {
            font-size: 10vw;
          }
          .page-title {
            font-size: 15vw;
          }
          .arrow-icon {
            display: none;
          }
        }
      `}</style>

      <div className="header-section">
        <div className="page-subtitle reveal-text">// UPLINK_TERMINAL</div>
        <h1 className="page-title">
          <span className="reveal-text">INITIATE</span>
          <span
            className="reveal-text"
            style={{ color: "#fff", WebkitTextStroke: "0" }}
          >
            CONTACT
          </span>
        </h1>
      </div>

      <div className="contact-list">
        {contactItems.map((item, index) => (
          <div
            key={item.id}
            className={`contact-item ${activeItem !== null && activeItem !== index ? "dimmed" : ""}`}
            onMouseEnter={() => {
              setActiveItem(index);
              // playSound("hover"); removed
            }}
            onMouseLeave={() => setActiveItem(null)}
            // onClick={() => playSound("click")} removed
          >
            <div className="divider-line"></div>
            <a href={item.link} className="contact-link">
              <div className="contact-content">
                <div className="item-id">{item.id}</div>
                <div className="item-main">
                  <div className="item-label">// {item.label}</div>
                  <div className="item-value">{item.value}</div>
                  {item.subValue && (
                    <div className="item-subvalue">{item.subValue}</div>
                  )}
                </div>
                <div className="arrow-icon">→</div>
              </div>
            </a>
          </div>
        ))}
      </div>

      <div className="marquee-container">
        <div className="marquee-content" ref={marqueeRef}>
          {/* Duplicated content for seamless loop */}
          {[1, 2, 3, 4].map((i) => (
            <React.Fragment key={i}>
              <span className="marquee-item">START A PROJECT</span>
              <span className="marquee-item">SAY HELLO</span>
              <span className="marquee-item">JOIN THE TEAM</span>
              <span className="marquee-item">DIGITAL ALCHEMY</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
