import React from "react";

export const EmailIcon = ({ color = "currentColor", ...props }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.50558 4.60914C2.65355 4.29968 2.97049 4.0835 3.33348 4.0835H16.6668C17.0298 4.0835 17.3467 4.29968 17.4947 4.60914L10.0001 9.85534L2.50558 4.60914ZM0.921036 4.85672C0.917313 4.89138 0.916026 4.92616 0.917129 4.9608C0.916918 4.97389 0.916812 4.98702 0.916812 5.00016V15.0002C0.916812 16.331 2.0026 17.4168 3.33348 17.4168H16.6668C17.9977 17.4168 19.0835 16.331 19.0835 15.0002V5.00016C19.0835 4.98701 19.0834 4.97389 19.0832 4.96079C19.0843 4.92623 19.083 4.89153 19.0793 4.85695C19.0047 3.59226 17.9496 2.5835 16.6668 2.5835H3.33348C2.05075 2.5835 0.995694 3.59214 0.921036 4.85672ZM17.5835 6.37799V15.0002C17.5835 15.5026 17.1693 15.9168 16.6668 15.9168H3.33348C2.83103 15.9168 2.41681 15.5026 2.41681 15.0002V6.37799L9.57005 11.3853C9.82829 11.566 10.172 11.566 10.4302 11.3853L17.5835 6.37799Z"
        fill={color}
      />
    </svg>
  );
};
