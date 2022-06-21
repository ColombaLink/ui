import React from "react";

export const ChevronRightIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6.25024 17.5L13.7502 10L6.25024 2.5"
        stroke={color}
        stroke-width="1.66667"
      />
    </svg>
  );
};
