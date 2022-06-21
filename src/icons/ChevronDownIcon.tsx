import React from "react";

export const ChevronDownIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M2.5 6.25L10 13.75L17.5 6.25"
        stroke={color}
        stroke-width="1.66667"
      />
    </svg>
  );
};
