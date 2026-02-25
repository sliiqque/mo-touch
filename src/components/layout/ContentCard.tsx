/**
 * ContentCard Component - A versatile card component that can handle regular content, testimonials, and contact items
 *
 * Usage Examples:
 *
 * // For regular content:
 * <ContentCard
 *   content={{ id: "1", title: "Title", desc: "Description", tags: ["tag1"] }}
 *   index={0}
 *   isActive={false}
 *   isDimmed={false}
 *   onMouseEnter={() => {}}
 *   onMouseLeave={() => {}}
 * />
 *
 * // For testimonials:
 * <ContentCard
 *   content={{ id: "T1", text: "Great service!", author: "John Doe", tags: ["service"] }}
 *   index={0}
 *   isActive={false}
 *   isDimmed={false}
 *   onMouseEnter={() => {}}
 *   onMouseLeave={() => {}}
 *   variant="testimonial"
 *   className="custom-class"
 * />
 *
 * // For contact items:
 * <ContentCard
 *   content={{ id: "01", label: "EMAIL", value: "contact@example.com", subValue: "Professional inquiries", link: "mailto:contact@example.com" }}
 *   index={0}
 *   isActive={false}
 *   isDimmed={false}
 *   onMouseEnter={() => {}}
 *   onMouseLeave={() => {}}
 *   variant="contact"
 *   className="custom-class"
 * />
 */
import React, { useState, useEffect } from "react";
import ContentTags from "./ContentTags";
import type {
  ContentCardProps,
  TestimonialItem,
  ContactItem,
  ContentItem,
} from "../../types/layout.js";

const ContentCard: React.FC<ContentCardProps> = ({
  content,
  index,
  isActive,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
  variant = "content",
  className = "",
}) => {
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isTestimonial = variant === "testimonial";
  const isContact = variant === "contact";
  const testimonial = content as TestimonialItem;
  const contactItem = content as ContactItem;
  const regularContent = content as ContentItem;

  const handleClick = () => {
    if (isContact && contactItem.link) {
      window.open(contactItem.link, "_blank", "noopener,noreferrer");
    }
  };

  // Handle responsive styles
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Styles
  const styles = {
    contentItem: {
      position: "relative" as const,
      padding: isMobile ? "1rem 0" : "4rem 0",
      cursor: "none",
      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      ...(isActive && { paddingLeft: "2rem" }),
      ...(isDimmed && {
        opacity: 0.2,
        filter: "blur(2px)",
      }),
    },
    dividerLine: {
      height: "1px",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      position: "absolute" as const,
      top: 0,
      left: 0,
    },
    contentBody: {
      display: "grid",
      gridTemplateColumns: isTablet ? "1fr" : "1fr 3fr 1fr",
      alignItems: "flex-start",
      gap: isTablet ? "1rem" : "2rem",
    },
    contentId: {
      fontFamily: '"TheGoodMonolith", monospace',
      fontSize: "1.5rem",
      color: "#666",
    },
    contentMain: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
    },
    contentTitle: {
      fontSize: "3.5vw",
      fontWeight: 700,
      lineHeight: 1,
      textTransform: "uppercase" as const,
      transition: "color 0.3s ease",
      color: isActive ? "#a64b23" : "inherit",
    },
    contentDesc: {
      fontSize: "1.5rem",
      fontWeight: 300,
      maxWidth: "600px",
      opacity: 0.7,
      marginTop: "1rem",
    },
    itemSubvalue: {
      fontSize: "1.5rem",
      fontWeight: 300,
      opacity: 0.7,
      maxWidth: "600px",
      marginTop: "1rem",
      fontFamily: '"PPNeueMontreal", sans-serif',
    },
    itemLabel: {
      fontFamily: '"TheGoodMonolith", monospace',
      fontSize: "1.2rem",
      color: "#a64b23",
      marginBottom: 0,
    },
    listQuote: {
      color: "#fff",
      fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
      fontFamily: '"PPNeueMontreal", sans-serif',
      lineHeight: 1.2,
      marginBottom: "1rem",
    },
    listAuthor: {
      opacity: 0.6,
      fontSize: "0.85rem",
    },
  };

  return (
    <div
      key={content.id}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => onMouseEnter(index)}
      onClick={isContact ? handleClick : undefined}
      style={{ ...styles.contentItem, ...(isContact && { cursor: "pointer" }) }}
      className={className}
    >
      <div style={styles.dividerLine}></div>
      <div style={styles.contentBody}>
        <div style={styles.contentId}>{content.id}</div>
        <div style={styles.contentMain}>
          {isTestimonial ? (
            <>
              <div style={{ ...styles.itemSubvalue, ...styles.listQuote }}>
                "{testimonial.text}"
              </div>
              <div style={{ ...styles.itemLabel, ...styles.listAuthor }}>
                // {testimonial.author}
              </div>
            </>
          ) : isContact ? (
            <>
              <div style={styles.itemLabel}>// {contactItem.label}</div>
              <div style={styles.contentTitle}>{contactItem.value}</div>
              {contactItem.subValue && (
                <div style={styles.itemSubvalue}>{contactItem.subValue}</div>
              )}
            </>
          ) : (
            <>
              <div style={styles.contentTitle}>{regularContent.title}</div>
              <div style={styles.contentDesc}>{regularContent.desc}</div>
            </>
          )}
        </div>
        <ContentTags
          tags={content.tags || []}
          isActive={isActive}
          className=""
        />
      </div>
    </div>
  );
};

export default ContentCard;
