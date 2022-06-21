import React from "react";

export const CheckIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.38757 13.1198L4.63388 10.3661C4.14572 9.87798 3.35427 9.87798 2.86612 10.3661C2.37796 10.8543 2.37796 11.6457 2.86612 12.1339L6.6161 15.8839C7.146 16.4138 8.01988 16.3615 8.48287 15.7723L17.2328 5.77232C17.6594 5.22949 17.5651 4.44367 17.0222 4.01715C16.4794 3.59064 15.6936 3.68494 15.2671 4.22777L7.38757 13.1198Z"
        fill={color}
      />
    </svg>
  );
};
