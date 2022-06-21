import React from "react";

type ChevronRightIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number;
};

export const ChevronRightIcon = ({
  color = "currentColor",
  size = 20,
  ...props
}: ChevronRightIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6.25024 17.5L13.7502 10L6.25024 2.5"
        stroke={color}
        strokeWidth="1.66667"
      />
    </svg>
  );
};
