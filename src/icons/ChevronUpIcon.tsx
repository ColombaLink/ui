import React from "react";

type ChevronRightIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number;
};

export const ChevronUpIcon = ({
  color = "currentColor",
  size = 20,
  ...props
}: ChevronRightIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M17.5 13.75L10 6.25L2.5 13.75"
        stroke={color}
        strokeWidth="1.66667"
      />
    </svg>
  );
};
