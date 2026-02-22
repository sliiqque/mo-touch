/**
 * ContentCard Component - A versatile card component that can handle both regular content and testimonials
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
 */
import React from "react";
import ContentTags from "./ContentTags";
import type {
  ContentCardProps,
  TestimonialItem,
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
  const isTestimonial = variant === "testimonial";
  const testimonial = content as TestimonialItem;
  const regularContent = content as ContentItem;

  return (
    <div
      key={content.id}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => onMouseEnter(index)}
      className={`content-item ${isDimmed ? "dimmed" : ""} ${isActive ? "active" : ""} ${isTestimonial ? "testimonial-item" : ""} ${className}`}
    >
      <div className="divider-line"></div>
      <div
        className={`content-body ${isTestimonial ? "about-content list-content" : ""}`}
      >
        <div className={`content-id ${isTestimonial ? "item-id" : ""}`}>
          {content.id}
        </div>
        <div className={`content-main ${isTestimonial ? "item-main" : ""}`}>
          {isTestimonial ? (
            <>
              <div className="item-subvalue list-quote">
                "{testimonial.text}"
              </div>
              <div className="item-label list-author">
                // {testimonial.author}
              </div>
            </>
          ) : (
            <>
              <div className="content-title">{regularContent.title}</div>
              <div className="content-desc">{regularContent.desc}</div>
            </>
          )}
        </div>
        <ContentTags
          tags={content.tags}
          isActive={isActive}
          className={isTestimonial ? "about-tags list-tags" : ""}
        />
      </div>
    </div>
  );
};

export default ContentCard;
