import React, { CSSProperties } from "react";

export const Logo = ({ style }: { style?: CSSProperties }) => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={style}
  >
    <g filter="url(#filter0_d_747_19262)">
      <rect x="8" y="6" width="40" height="40" rx="8.59375" fill="#232323" />
      <rect
        x="8.5"
        y="6.5"
        width="39"
        height="39"
        rx="8.09375"
        stroke="white"
        strokeOpacity="0.08"
      />
    </g>
    <path
      d="M38.411 19.1992L28.8696 28.7407H19.3281L28.8696 19.1992H38.411Z"
      fill="#4B41FF"
    />
    <path
      d="M40.6562 28.7405L31.1148 38.2819H19.3281L28.8696 28.7405H40.6562Z"
      fill="#FF1F85"
    />
    <path
      d="M28.8696 10.2188L19.3281 19.7602V28.7405L28.8696 19.199V10.2188Z"
      fill="#008CFF"
    />
    <defs>
      <filter
        id="filter0_d_747_19262"
        x="0"
        y="0"
        width="56"
        height="56"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="4" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.0588235 0 0 0 0 0.0627451 0 0 0 0 0.0745098 0 0 0 0.06 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_747_19262"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_747_19262"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);
