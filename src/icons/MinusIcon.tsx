import React from "react";

export const MinusIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2.5" y="8.75" width="15" height="2.5" rx="1.25" fill={color} />
    </svg>
  );
};
