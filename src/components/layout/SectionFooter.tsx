import React from "react";
import type { SectionFooterProps } from "../../types/layout.js";

const SectionFooter: React.FC<SectionFooterProps> = ({
  text,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`section-footer ${className}`}
      style={{
        opacity: 0.5,
        textAlign: "center",
        fontFamily: "TheGoodMonolith, monospace",
        ...style,
      }}
    >
      {text}
    </div>
  );
};

export default SectionFooter;
