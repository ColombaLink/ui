import React from "react";

export const AlignLeftIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M14.1667 8.3335H2.5" stroke={color} stroke-width="1.5" />
      <path d="M17.5 5H2.5" stroke={color} stroke-width="1.5" />
      <path d="M17.5 11.6665H2.5" stroke={color} stroke-width="1.5" />
      <path d="M14.1667 15H2.5" stroke={color} stroke-width="1.5" />
    </svg>
  );
};
