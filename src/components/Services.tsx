import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      id: "01",
      title: "DIGITAL_STRATEGY",
      desc: "Blueprint for digital dominance. We architect the unseen foundations of your brand's future.",
      tags: ["Brand Architecture", "User Journey", "Market Analysis", "Growth Systems"],
    },
    {
      id: "02",
      title: "UI/UX_DESIGN",
      desc: "Crafting the interface of tomorrow. Brutalist aesthetics meets human-centric functionality.",
      tags: ["Interface Design", "Experience Systems", "Design Systems", "Prototyping"],
    },
    {
      id: "03",
      title: "WEB_DEVELOPMENT",
      desc: "Code as art. Performance-obsessed engineering for the modern web.",
      tags: ["React/Next.js", "WebGL/Three.js", "Headless CMS", "Performance Opt."],
    },
    {
      id: "04",
      title: "MOTION_GRAPHICS",
      desc: "Breathing life into pixels. Kinetic typography and fluid transitions.",
      tags: ["2D/3D Animation", "Interaction Design", "Micro-interactions", "Video Production"],
    },
  ];

  // Custom Cursor Logic
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out",
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".service-header-text", {
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

      // Service Item Animations
      // Set initial state to avoid FOUC but ensure visibility if JS fails
      gsap.set(".service-item", { autoAlpha: 0, y: 50 });
      
      gsap.to(".service-item", {
        duration: 0.8,
        autoAlpha: 1,
        y: 0,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2, // Reduced delay
        clearProps: "transform" // Keep opacity/visibility, clear transform to avoid stacking context issues
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    setActiveService(index);
  };

  const handleMouseLeave = () => {
    setActiveService(null);
  };

  return (
    <div className="services-page" ref={containerRef}>
      <style>{`
        .services-page {
          height: 100vh;
          width: 100vw;
          background-color: #0a0a0a;
          color: #e0e0e0;
          font-family: 'PPNeueMontreal', sans-serif;
          padding: 120px 5vw 5vw 5vw;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
          cursor: none;
          /* Hide scrollbar for Chrome/Safari/Opera */
          -webkit-overflow-scrolling: touch;
        }
        
        .services-page::-webkit-scrollbar {
            display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .services-page {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
        }
        
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          background: #fff;
          border-radius: 50%;
          pointer-events: none;
          mix-blend-mode: difference;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }

        .noise-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9000;
          opacity: 0.05;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .header-section {
          margin-bottom: 8rem;
          position: relative;
        }

        .page-title {
          font-size: 12vw;
          line-height: 0.85;
          font-weight: 800;
          text-transform: uppercase;
          margin: 0;
          color: transparent;
          -webkit-text-stroke: 1px #fff;
          position: relative;
          z-index: 1;
        }
        
        .page-title span {
            display: block;
        }

        .page-subtitle {
          font-family: 'TheGoodMonolith', monospace;
          font-size: 1.2rem;
          margin-top: 2rem;
          color: #A64B23;
          letter-spacing: 0.1em;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .service-item {
          position: relative;
          padding: 4rem 0;
          cursor: none;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-item:hover {
            padding-left: 2rem;
        }

        .service-item.dimmed {
            opacity: 0.2;
            filter: blur(2px);
        }

        .divider-line {
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .service-content {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
          align-items: flex-start;
          gap: 2rem;
        }

        .service-id {
          font-family: 'TheGoodMonolith', monospace;
          font-size: 1.5rem;
          color: #666;
        }

        .service-main {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .service-title {
          font-size: 5vw;
          font-weight: 700;
          line-height: 1;
          text-transform: uppercase;
          transition: color 0.3s ease;
        }

        .service-item:hover .service-title {
            color: #A64B23;
        }

        .service-desc {
          font-size: 1.5rem;
          font-weight: 300;
          max-width: 600px;
          opacity: 0.7;
          margin-top: 1rem;
        }

        .service-tags {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-family: 'TheGoodMonolith', monospace;
          font-size: 0.9rem;
          color: #888;
          text-align: right;
        }
        
        .service-tag-item {
            opacity: 0;
            transform: translateX(20px);
            transition: all 0.4s ease;
        }
        
        .service-item:hover .service-tag-item {
            opacity: 1;
            transform: translateX(0);
        }

        @media (max-width: 768px) {
          .service-content {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .service-tags {
            flex-direction: row;
            flex-wrap: wrap;
            text-align: left;
            margin-top: 1rem;
          }
          .service-tag-item {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="noise-overlay"></div>
      <div className="custom-cursor" ref={cursorRef}></div>

      <div className="header-section">
        <div className="page-subtitle service-header-text">// SYSTEM_CAPABILITIES</div>
        <h1 className="page-title">
          <span className="service-header-text">PROTOCOL</span>
          <span className="service-header-text" style={{ color: "#fff", WebkitTextStroke: "0" }}>SERVICES</span>
        </h1>
      </div>

      <div className="services-list">
        {services.map((service, index) => (
          <div 
            key={service.id} 
            className={`service-item ${activeService !== null && activeService !== index ? 'dimmed' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="divider-line"></div>
            <div className="service-content">
              <div className="service-id">{service.id}</div>
              <div className="service-main">
                <div className="service-title">{service.title}</div>
                <div className="service-desc">{service.desc}</div>
              </div>
              <div className="service-tags">
                {service.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="service-tag-item"
                    style={{ transitionDelay: `${i * 0.05}s` }}
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="divider-line" style={{ top: 'auto', bottom: 0 }}></div>
      </div>
      
      <div style={{ marginTop: '10vh', fontFamily: 'TheGoodMonolith, monospace', textAlign: 'center', opacity: 0.5 }}>
        // END_OF_PROTOCOL
      </div>
    </div>
  );
};

export default Services;
