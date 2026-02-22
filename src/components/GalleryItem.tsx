import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface GalleryItemProps {
  item: {
    id: number;
    img: string;
    title: string;
    description: string;
  };
  onClick: (item: GalleryItemProps["item"]) => void;
  onLoad?: () => void;
  onError?: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  item,
  onClick,
  onLoad,
  onError,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = itemRef.current;
    if (element) {
      // Simple entrance animation
      gsap.fromTo(
        element,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    }
  }, []);

  const handleClick = () => {
    onClick(item);
  };

  return (
    <div
      ref={itemRef}
      className="gallery-item"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`View ${item.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      style={{
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        backgroundColor: "#1a1a1a",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2 });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, { scale: 1, duration: 0.2 });
      }}
    >
      <img
        src={item.img}
        alt={item.description}
        loading="lazy"
        onLoad={onLoad}
        onError={onError}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          right: "0",
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          color: "#fff",
          padding: "1rem",
          fontSize: "0.9rem",
        }}
      >
        {item.title}
      </div>
    </div>
  );
};

export default GalleryItem;
