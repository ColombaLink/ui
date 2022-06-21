import React from "react";

export const ExpandRightIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 4.79304C7.5 3.98924 8.12791 3.48843 8.6279 3.89344L14.6279 9.1004C15.124 9.50228 15.124 10.4977 14.6279 10.8996L8.6279 16.1066C8.12791 16.5116 7.5 16.0108 7.5 15.207V4.79304Z"
        fill={color}
      />
    </svg>
  );
};
