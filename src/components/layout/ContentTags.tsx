import React from "react";
import type { ContentTagsProps } from "../../types/layout.js";

const ContentTags: React.FC<ContentTagsProps> = ({
  tags,
  isActive,
  className = "",
}) => {
  return (
    <div className={`content-tags ${className}`}>
      {tags.map((tag, i) => (
        <span
          key={i}
          className={`content-tag-item ${className.includes("about-tags") ? "about-tag-item tag-item" : ""}`}
          style={{
            transitionDelay: `${i * 0.05}s`,
            opacity: isActive ? 1 : 0.7,
            transform: isActive ? "translateY(0)" : "translateY(5px)",
            transition: "all 0.3s ease",
          }}
        >
          [{tag}]
        </span>
      ))}
    </div>
  );
};

export default ContentTags;
