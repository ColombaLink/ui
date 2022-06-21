import React from "react";

export const ChevronUpIcon = ({ color = "currentColor" }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M17.5 13.75L10 6.25L2.5 13.75"
        stroke={color}
        stroke-width="1.66667"
      />
    </svg>
  );
};
