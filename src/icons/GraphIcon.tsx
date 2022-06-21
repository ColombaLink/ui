import React from "react";

export const GraphIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path d="M2.5 2.5V17.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 17.5H2.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M5.8335 13.3333L10.2085 8.95833L13.1252 11.875L17.5002 7.5"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};
