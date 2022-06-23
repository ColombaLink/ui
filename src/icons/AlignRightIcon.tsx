import React from "react";

type AlignRightIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number;
};

export const AlignRightIcon = ({
  color = "currentColor",
  size = 20,
  ...props
}: AlignRightIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path d="M17.5002 8.3335H5.8335" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 5H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5 11.6665H2.5" stroke={color} strokeWidth="1.5" />
      <path d="M17.5002 15H5.8335" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};
