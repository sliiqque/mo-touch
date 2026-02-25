import React, { useState, useEffect } from "react";
import type { ContentTagsProps } from "../../types/layout.js";

const ContentTags: React.FC<ContentTagsProps> = ({
  tags,
  isActive,
  className = "",
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const isAboutTags = className.includes("about-tags");

  // Handle responsive styles
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Styles
  const styles = {
    contentTags: {
      display: "flex" as const,
      flexDirection: (isTablet && isAboutTags ? "row" : "column") as
        | "row"
        | "column",
      flexWrap: (isTablet && isAboutTags ? "wrap" : "nowrap") as
        | "wrap"
        | "nowrap",
      gap: "0.5rem",
      fontFamily: '"TheGoodMonolith", monospace',
      fontSize: "0.9rem",
      color: "#888",
      textAlign: (isMobile || (isTablet && isAboutTags) ? "left" : "right") as
        | "left"
        | "right",
      marginTop: isTablet && isAboutTags ? "1rem" : "0",
    },
    contentTagItem: {
      opacity: isTablet && isAboutTags ? 1 : isActive ? 1 : 0.7,
      transform:
        isTablet && isAboutTags
          ? "none"
          : isActive
            ? "translateY(0)"
            : "translateY(5px)",
      transition: "all 0.3s ease",
      transitionDelay: `${0}s`, // Will be overridden inline
    },
  };

  return (
    <div style={styles.contentTags} className={className}>
      {tags.map((tag, i) => (
        <span
          key={i}
          style={{
            ...styles.contentTagItem,
            transitionDelay: `${i * 0.05}s`,
          }}
        >
          [{tag}]
        </span>
      ))}
    </div>
  );
};

export default ContentTags;
