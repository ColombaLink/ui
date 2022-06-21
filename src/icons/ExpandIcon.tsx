import React from "react";

export const ExpandIcon = ({ color = "currentColor" }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.207 6.25C16.0108 6.25 16.5116 6.87791 16.1066 7.3779L10.8996 13.3779C10.4977 13.874 9.50228 13.874 9.1004 13.3779L3.89344 7.3779C3.48843 6.87791 3.98924 6.25 4.79304 6.25L15.207 6.25Z"
        fill={color}
      />
    </svg>
  );
};
