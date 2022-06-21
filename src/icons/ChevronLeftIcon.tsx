import React from "react";

export const ChevronLeftIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M13.75 2.5L6.25 10L13.75 17.5"
        stroke={color}
        stroke-width="1.5"
      />
    </svg>
  );
};
