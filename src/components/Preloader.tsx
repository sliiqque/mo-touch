import React, { useEffect, useRef } from "react";

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let startTime: number | null = null;
    const duration = 2500; // Slightly longer than 2s for smooth exit

    const dotRings = [
      { radius: 20, count: 8 },
      { radius: 35, count: 12 },
      { radius: 50, count: 16 },
      { radius: 65, count: 20 },
      { radius: 80, count: 24 },
    ];

    const colors = {
      primary: "#52525b", // Zinc 600 (muted)
      accent: "#A64B23", // Orange/Rust
    };

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const time = elapsed * 0.001; // seconds

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Re-center on resize
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      const rgb = hexToRgb(colors.primary);
      ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.9)`;
      ctx.fill();

      // Draw Line Pulse Wave animation
      dotRings.forEach((ring, ringIndex) => {
        for (let i = 0; i < ring.count; i++) {
          const angle = (i / ring.count) * Math.PI * 2;
          // Pulse effect
          const radiusPulse = Math.sin(time * 3 - ringIndex * 0.5) * 5;
          const r = ring.radius + radiusPulse;

          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;

          // Wave opacity
          const waveVal = Math.sin(time * 3 - ringIndex * 0.5 + i * 0.1);
          const opacityWave = 0.3 + ((waveVal + 1) / 2) * 0.7; // 0.3 to 1.0
          const isActive = waveVal > 0.8;

          // Draw line from center to point (faint)
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x, y);
          ctx.lineWidth = isActive ? 1.5 : 0.5;

          if (isActive) {
            const c = hexToRgb(colors.accent);
            ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacityWave * 0.8})`;
          } else {
            const c = hexToRgb(colors.primary);
            ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacityWave * 0.3})`;
          }
          ctx.stroke();

          // Draw dot at the end
          ctx.beginPath();
          ctx.arc(x, y, isActive ? 3 : 2, 0, Math.PI * 2);
          if (isActive) {
            const c = hexToRgb(colors.accent);
            ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacityWave})`;
          } else {
            const c = hexToRgb(colors.primary);
            ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${opacityWave})`;
          }
          ctx.fill();
        }
      });

      if (elapsed < duration) {
        animationIdRef.current = requestAnimationFrame(animate);
      } else {
        // Fade out
        if (overlayRef.current) {
          overlayRef.current.style.opacity = "0";
          setTimeout(onComplete, 500);
        } else {
          onComplete();
        }
      }
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="preloader-overlay"
      role="progressbar"
      aria-label="Loading application"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        transition: "opacity 0.5s ease",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};

export default Preloader;
