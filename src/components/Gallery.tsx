import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Draggable, Flip, CustomEase } from "gsap/all";
import { imageData, fashionImages } from "../data";

// Register GSAP plugins
gsap.registerPlugin(Draggable, Flip, CustomEase);

// Custom Eases
const customEase = CustomEase.create("smooth", ".87,0,.13,1");
const centerEase = CustomEase.create("center", ".25,.46,.45,.94");

interface GridItem {
  id: number;
  col: number;
  row: number;
  x: number;
  y: number;
  img: string;
  title: string;
  number: string;
  description: string;
  element?: HTMLDivElement;
}

const BASE_WIDTH = 320;
const BASE_HEIGHT = 320;
const BASE_GAP = 10;

const Gallery: React.FC = () => {
  // Refs for DOM elements
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const splitScreenRef = useRef<HTMLDivElement>(null);
  const zoomTargetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const soundCanvasRef = useRef<HTMLCanvasElement>(null);

  // Refs for animation/logic state
  const draggableInstance = useRef<Draggable[] | null>(null);
  const animationFrameRef = useRef<number>(0);

  // Temporary storage for zoom transition elements
  const currentScalingOverlayRef = useRef<HTMLDivElement | null>(null);
  const currentZoomItemRef = useRef<{
    element: HTMLDivElement;
    img: HTMLImageElement;
    item: GridItem;
  } | null>(null);
  const currentFlipAnimationRef = useRef<gsap.core.Tween | null>(null);
  const currentAmplitudeRef = useRef(0);

  const [isZoomed, setIsZoomed] = useState(false);
  const [activeZoom, setActiveZoom] = useState(0.6); // Default zoom level
  const [loadingProgress, setLoadingProgress] = useState(0); // For percentage indicator
  const [isSoundActive, setIsSoundActive] = useState(false);

  // Sound System State
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  // Initialize Audio
  useEffect(() => {
    const audioUrls = {
      click: "https://assets.codepen.io/7558/glitch-fx-001.mp3",
      open: "https://assets.codepen.io/7558/click-glitch-001.mp3",
      close: "https://assets.codepen.io/7558/click-glitch-001.mp3",
      "zoom-in": "https://assets.codepen.io/7558/whoosh-fx-001.mp3",
      "zoom-out": "https://assets.codepen.io/7558/whoosh-fx-001.mp3",
    };

    Object.entries(audioUrls).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.3;
      audioRefs.current[key] = audio;
    });
  }, []);

  const playSound = (name: string) => {
    if (!isSoundActive || !audioRefs.current[name]) return;
    try {
      const audio = audioRefs.current[name];
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {
      // Ignore audio errors
    }
  };

  // Helper to split text into lines matching reference logic
  const splitTextIntoLines = (element: HTMLElement, text: string) => {
    element.innerHTML = "";

    // Split by sentences (lookbehind for punctuation followed by space)
    // Note: JS lookbehind support might vary, but we can use a simpler split
    // or just split by words if sentences are too complex to detect robustly without lookbehind in older browsers
    // matching reference logic:
    const sentences = text.split(/(?<=[.!?])\s+/);
    const lines: string[] = [];

    // Create temporary div to measure
    const temp = document.createElement("div");
    temp.style.cssText = `
      position: absolute;
      visibility: hidden;
      width: ${element.offsetWidth}px;
      font-family: 'PPNeueMontreal', sans-serif;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.4;
    `;
    document.body.appendChild(temp);

    let currentLine = "";

    sentences.forEach((sentence) => {
      const words = sentence.split(" ");
      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        temp.textContent = testLine;

        if (temp.offsetWidth > element.offsetWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    document.body.removeChild(temp);

    // Create elements
    const createdLines: HTMLElement[] = [];
    lines.forEach((lineText) => {
      const lineDiv = document.createElement("div");
      lineDiv.className = "description-line";
      lineDiv.textContent = lineText;
      element.appendChild(lineDiv);
      createdLines.push(lineDiv);
    });

    return createdLines;
  };

  // Generate Grid Data
  const items = React.useMemo(() => {
    // Fixed layout, not dependent on activeZoom
    const zoom = 1;
    const cols = 20;
    const rows = 20;
    const gridItems: GridItem[] = [];
    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);

    const scaledWidth = BASE_WIDTH * zoom;
    const scaledHeight = BASE_HEIGHT * zoom;
    const scaledGap = BASE_GAP * zoom;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xOffset = (col - centerX) * (scaledWidth + scaledGap);
        const yOffset = (row - centerY) * (scaledHeight + scaledGap);

        // Use modulo to cycle through images
        const dataIndex = (row * cols + col) % imageData.length;
        const data = imageData[dataIndex];
        const imgUrl = fashionImages[dataIndex % fashionImages.length];

        gridItems.push({
          id: row * cols + col,
          col,
          row,
          x: xOffset,
          y: yOffset,
          img: imgUrl,
          ...data,
        });
      }
    }
    return gridItems;
  }, []);

  // Initial Setup (Loading only)
  useLayoutEffect(() => {
    // Simulate loading
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setLoadingProgress(progress);
    }, 20);

    return () => clearInterval(interval);
  }, []); // Run once on mount

  // Calculate bounds for Draggable
  const getBounds = (zoomLevel = activeZoom) => {
    const zoom = zoomLevel;
    const cols = 20;
    const rows = 20;
    const scaledWidth = BASE_WIDTH * zoom;
    const scaledHeight = BASE_HEIGHT * zoom;
    const scaledGap = BASE_GAP * zoom;

    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);

    // Calculate grid dimensions relative to center (0,0)
    // Leftmost edge of the first item (col 0)
    const minGridX = (0 - centerX) * (scaledWidth + scaledGap);
    // Rightmost edge of the last item (col 19)
    const maxGridX =
      (cols - 1 - centerX) * (scaledWidth + scaledGap) + scaledWidth;

    // Topmost edge
    const minGridY = (0 - centerY) * (scaledHeight + scaledGap);
    // Bottommost edge
    const maxGridY =
      (rows - 1 - centerY) * (scaledHeight + scaledGap) + scaledHeight;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    return {
      minX: viewportWidth - maxGridX,
      maxX: -minGridX,
      minY: viewportHeight - maxGridY,
      maxY: -minGridY,
    };
  };

  // Handle Zoom Change Effects (Draggable updates)
  useEffect(() => {
    if (isZoomed) return;

    // Update Draggable bounds if needed
    if (draggableInstance.current && draggableInstance.current[0]) {
      draggableInstance.current[0].applyBounds(getBounds());
    }
  }, [activeZoom, isZoomed]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (draggableInstance.current && draggableInstance.current[0]) {
        draggableInstance.current[0].applyBounds(getBounds());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeZoom]);

  // Initialize Draggable and Animations
  useEffect(() => {
    if (!canvasWrapperRef.current || isZoomed) return;

    // Center the grid initially (vw/2, vh/2 because items are centered around 0,0)
    gsap.set(canvasWrapperRef.current, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      scale: activeZoom,
    });

    // Initialize Draggable
    draggableInstance.current = Draggable.create(canvasWrapperRef.current, {
      type: "x,y",
      edgeResistance: 0.65,
      bounds: getBounds(),
      inertia: true,
      onDrag: function () {
        // Optional: parallax or other effects
      },
    });

    // Intro Animation for Grid Items
    const items = document.querySelectorAll(".grid-item");
    gsap.fromTo(
      items,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: {
          amount: 1.5,
          grid: [20, 20],
          from: "center",
        },
        ease: "power3.out",
        onComplete: () => {
          if (controlsRef.current) {
            controlsRef.current.classList.add("visible");
          }
        },
      },
    );

    return () => {
      if (draggableInstance.current && draggableInstance.current[0]) {
        draggableInstance.current[0].kill();
      }
    };
  }, [items.length]); // Re-run when items are generated

  // Sound System Logic
  useEffect(() => {
    const canvas = soundCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const startTime = Date.now();

    const interpolateColor = (
      color1: string,
      color2: string,
      factor: number,
    ) => {
      const r1 = parseInt(color1.substring(1, 3), 16);
      const g1 = parseInt(color1.substring(3, 5), 16);
      const b1 = parseInt(color1.substring(5, 7), 16);

      const r2 = parseInt(color2.substring(1, 3), 16);
      const g2 = parseInt(color2.substring(3, 5), 16);
      const b2 = parseInt(color2.substring(5, 7), 16);

      const r = Math.round(r1 + factor * (r2 - r1))
        .toString(16)
        .padStart(2, "0");
      const g = Math.round(g1 + factor * (g2 - g1))
        .toString(16)
        .padStart(2, "0");
      const b = Math.round(b1 + factor * (b2 - b1))
        .toString(16)
        .padStart(2, "0");

      return `#${r}${g}${b}`;
    };

    const drawWave = () => {
      const targetAmplitude = isSoundActive ? 1 : 0;
      currentAmplitudeRef.current +=
        (targetAmplitude - currentAmplitudeRef.current) * 0.08;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stop drawing if silent and amplitude is negligible
      if (!isSoundActive && currentAmplitudeRef.current < 0.01) {
        ctx.fillStyle = "#D9C4AA"; // Mute color
        ctx.fillRect(0, canvas.height / 2, canvas.width, 2);
        return;
      }

      const time = (Date.now() - startTime) / 1000;
      const centerY = canvas.height / 2;
      const width = canvas.width;
      const height = canvas.height;
      const muteFactor = 1 - currentAmplitudeRef.current;

      const primaryColor = "#18181B"; // Zinc 900
      const accentColor = "#A64B23";
      const muteColor = "#52525b"; // Zinc 600

      // First wave
      ctx.fillStyle = interpolateColor(primaryColor, muteColor, muteFactor);
      for (let i = 0; i < width; i++) {
        const x = i - width / 2;
        // Gaussian window
        const e = Math.exp((-x * x) / 50);
        const y =
          centerY +
          Math.cos(x * 0.4 - time * 8) *
            e *
            height *
            0.35 *
            currentAmplitudeRef.current;
        ctx.fillRect(i, Math.round(y), 1, 2);
      }

      // Second wave (accent)
      ctx.fillStyle = interpolateColor(accentColor, muteColor, muteFactor);
      for (let i = 0; i < width; i++) {
        const x = i - width / 2;
        const e = Math.exp((-x * x) / 80);
        const y =
          centerY +
          Math.cos(x * 0.3 - time * 5) *
            e *
            height *
            0.25 *
            currentAmplitudeRef.current;
        ctx.fillRect(i, Math.round(y), 1, 2);
      }

      animationFrameRef.current = requestAnimationFrame(drawWave);
    };

    drawWave();

    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [isSoundActive]);

  const toggleSound = () => {
    if (!isSoundActive) {
      // Just turned on
      setTimeout(() => playSound("click"), 50);
    }
    setIsSoundActive(!isSoundActive);
  };

  // Zoom Logic
  const handleItemClick = (item: GridItem, e: React.MouseEvent) => {
    if (isZoomed) return;

    const element = e.currentTarget as HTMLDivElement;
    const img = element.querySelector("img") as HTMLImageElement;

    // 1. Disable Draggable
    if (draggableInstance.current && draggableInstance.current[0]) {
      draggableInstance.current[0].disable();
    }

    playSound("click");
    playSound("zoom-in");

    setIsZoomed(true);
    document.body.classList.add("zoom-mode");

    // 2. Create Scaling Overlay
    const overlay = document.createElement("div");
    overlay.className = "scaling-image-overlay";
    const overlayImg = document.createElement("img");
    overlayImg.src = img.src;
    overlayImg.alt = img.alt;
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);

    // Position overlay over original image
    // const state = Flip.getState(overlay);

    gsap.set(overlay, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 5,
    });

    // 3. Prepare Target
    const target = zoomTargetRef.current;

    // 4. Flip Animation
    if (target) {
      // We need to fit the overlay to the target
      // First, set the overlay to match the clicked element's position/size
      const rect = element.getBoundingClientRect();
      gsap.set(overlay, {
        position: "fixed",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        opacity: 1,
      });

      // Hide original
      gsap.set(img, { opacity: 0 });

      // Show Split Screen
      if (splitScreenRef.current) {
        splitScreenRef.current.classList.add("active");
        gsap.to(splitScreenRef.current, {
          opacity: 1,
          duration: 1.2,
          ease: "power2.inOut",
        });
      }

      // Animate Controls
      if (controlsRef.current) {
        controlsRef.current.classList.add("split-mode");
      }

      // Flip to Target
      const flipAnim = Flip.fit(overlay, target, {
        duration: 1.2,
        ease: "power2.inOut",
        absolute: true,
        onComplete: () => {
          // Show Text Overlay
          updateTextOverlay(item);
          if (overlayRef.current) {
            overlayRef.current.classList.add("active");
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.3 });

            // Stagger Text Animations
            const title = overlayRef.current.querySelector(
              ".image-slide-title h1",
            );
            const number = overlayRef.current.querySelector(
              ".image-slide-number span",
            );
            const desc = overlayRef.current.querySelector(
              ".image-slide-description",
            );

            if (title)
              gsap.fromTo(
                title,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.1 },
              );
            if (number)
              gsap.fromTo(
                number,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.05 },
              );
            if (desc) {
              const lines = desc.querySelectorAll(".description-line");
              gsap.fromTo(
                lines,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, delay: 0.15, stagger: 0.1 },
              );
            }
          }

          // Show Close Button
          if (closeButtonRef.current) {
            closeButtonRef.current.classList.add("active");
            gsap.fromTo(
              closeButtonRef.current,
              { x: 40, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.6 },
            );
          }
        },
      });
      currentFlipAnimationRef.current = flipAnim as gsap.core.Tween;
    }

    // Store reference to overlay for exit
    currentScalingOverlayRef.current = overlay;
    currentZoomItemRef.current = { element, img, item };
  };

  const updateTextOverlay = (item: GridItem) => {
    if (!overlayRef.current) return;

    const titleEl = overlayRef.current.querySelector("#imageSlideTitle h1");
    const numberEl = overlayRef.current.querySelector("#imageSlideNumber span");
    const descEl = overlayRef.current.querySelector("#imageSlideDescription");

    if (titleEl) titleEl.textContent = item.title;
    if (numberEl) numberEl.textContent = item.number;
    if (descEl && descEl instanceof HTMLElement) {
      splitTextIntoLines(descEl, item.description);
    }
  };

  const handleExitZoom = () => {
    if (!isZoomed) return;

    const overlay = currentScalingOverlayRef.current;
    const { element, img } = currentZoomItemRef.current || {};

    if (!overlay || !element || !img) return;

    // Kill any active flip animation
    if (currentFlipAnimationRef.current) {
      currentFlipAnimationRef.current.kill();
      currentFlipAnimationRef.current = null;
    }

    // Hide UI
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
      overlayRef.current.classList.remove("active");
    }

    if (closeButtonRef.current) {
      gsap.to(closeButtonRef.current, {
        x: 40,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          closeButtonRef.current?.classList.remove("active");
        },
      });
    }

    if (splitScreenRef.current) {
      gsap.to(splitScreenRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          splitScreenRef.current?.classList.remove("active");
        },
      });
    }

    if (controlsRef.current) {
      controlsRef.current.classList.remove("split-mode");
    }

    // Flip Back
    const flipAnim = Flip.fit(overlay, element, {
      duration: 1.2,
      ease: "power2.inOut",
      absolute: true,
      onComplete: () => {
        gsap.set(img, { opacity: 1 });
        if (overlay && overlay.parentNode) {
          overlay.parentNode.removeChild(overlay);
        }
        setIsZoomed(false);
        document.body.classList.remove("zoom-mode");

        if (draggableInstance.current && draggableInstance.current[0]) {
          draggableInstance.current[0].enable();
        }
      },
    });
    currentFlipAnimationRef.current = flipAnim as gsap.core.Tween;
  };

  const handleZoom = (newZoom: number) => {
    if (activeZoom === newZoom) return;

    const isZoomingIn = newZoom > activeZoom;
    playSound(isZoomingIn ? "zoom-in" : "zoom-out");

    if (!canvasWrapperRef.current) return;

    if (draggableInstance.current && draggableInstance.current[0]) {
      draggableInstance.current[0].disable();
    }

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveZoom(newZoom);
        if (draggableInstance.current && draggableInstance.current[0]) {
          draggableInstance.current[0].enable();
          draggableInstance.current[0].applyBounds(getBounds(newZoom));
        }
      },
    });

    tl.to(canvasWrapperRef.current, {
      duration: 0.6,
      x: vw / 2,
      y: vh / 2,
      ease: centerEase,
    });

    tl.to(
      canvasWrapperRef.current,
      {
        duration: 1.2,
        scale: newZoom,
        ease: customEase,
      },
      "-=0.2",
    );
  };

  return (
    <>
      {/* Viewport & Grid */}
      <div className="viewport" ref={viewportRef}>
        <div className="canvas-wrapper" ref={canvasWrapperRef}>
          <div
            className="grid-container"
            ref={gridContainerRef}
            style={{
              width: `${20 * (BASE_WIDTH + BASE_GAP)}px`,
              height: `${20 * (BASE_HEIGHT + BASE_GAP)}px`,
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="grid-item"
                onClick={(e) => handleItemClick(item, e)}
                style={{
                  transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
                  width: `${BASE_WIDTH}px`,
                  height: `${BASE_HEIGHT}px`,
                }}
              >
                <img src={item.img} alt={item.title} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split Screen Container */}
      <div className="split-screen-container" ref={splitScreenRef}>
        <div className="split-left" id="splitLeft" onClick={handleExitZoom}>
          <div
            className="zoom-target"
            id="zoomTarget"
            ref={zoomTargetRef}
          ></div>
        </div>
        <div
          className="split-right"
          id="splitRight"
          onClick={handleExitZoom}
        ></div>
      </div>

      {/* Image Title Overlay */}
      {createPortal(
        <div className="image-title-overlay" ref={overlayRef}>
          <div className="image-slide-number" id="imageSlideNumber">
            <span>01</span>
          </div>
          <div className="image-slide-title" id="imageSlideTitle">
            <h1>TITLE HERE</h1>
          </div>
          <div className="image-slide-description" id="imageSlideDescription">
            {/* Description lines will be injected here */}
          </div>
        </div>,
        document.body,
      )}

      {/* Controls */}
      <div
        className="controls-container"
        ref={controlsRef}
        id="controlsContainer"
      >
        <div className="percentage-indicator" id="percentageIndicator">
          {loadingProgress}%
        </div>
        <div className="switch" id="controls">
          <button
            className={`switch-button ${activeZoom === 0.3 ? "switch-button-current" : ""}`}
            onClick={() => handleZoom(0.3)}
          >
            <span className="indicator-dot"></span>ZOOM OUT
          </button>
          <button
            className={`switch-button ${activeZoom === 0.6 ? "switch-button-current" : ""}`}
            onClick={() => handleZoom(0.6)}
          >
            <span className="indicator-dot"></span>NORMAL
          </button>
          <button
            className={`switch-button ${activeZoom === 1.0 ? "switch-button-current" : ""}`}
            onClick={() => handleZoom(1.0)}
          >
            <span className="indicator-dot"></span>ZOOM IN
          </button>
          <button
            className="switch-button"
            onClick={() => {
              /* Fit logic placeholder */
            }}
          >
            <span className="indicator-dot"></span>FIT
          </button>
        </div>
        <button
          className={`sound-toggle ${isSoundActive ? "active" : ""}`}
          onClick={toggleSound}
          aria-label={isSoundActive ? "Mute sound" : "Unmute sound"}
        >
          <canvas
            ref={soundCanvasRef}
            className="sound-wave-canvas"
            width="32"
            height="16"
          ></canvas>
        </button>
      </div>

      {/* Close Button */}
      <button
        className="close-button"
        ref={closeButtonRef}
        onClick={handleExitZoom}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.89873 16L6.35949 14.48L11.8278 9.08H0V6.92H11.8278L6.35949 1.52L7.89873 0L16 8L7.89873 16Z"
            fill="white"
          />
        </svg>
      </button>
    </>
  );
};

export default Gallery;
