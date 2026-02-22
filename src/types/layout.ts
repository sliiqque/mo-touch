export interface SectionFooterProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface ContentItem {
  id: string;
  title: string;
  desc: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  text: string;
  author: string;
  tags: string[];
}

export type ContentCardVariant = "content" | "testimonial";

export interface ContentCardProps {
  content: ContentItem | TestimonialItem;
  index: number;
  isActive: boolean;
  isDimmed: boolean;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  variant?: ContentCardVariant;
  className?: string;
}

export interface ContentTagsProps {
  tags: string[];
  isActive: boolean;
  className?: string;
}

export interface MarqueeProps {
  items: string[];
  repetitions?: number;
  className?: string;
}
