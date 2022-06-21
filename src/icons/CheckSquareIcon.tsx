import React from "react";

type CheckSquareIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number;
};

export const CheckSquareIcon = ({
  color = "currentColor",
  size = 20,
  ...props
}: CheckSquareIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        d="M4.07007 19H15.9299C17.9832 19 19 17.9832 19 15.969V4.03096C19 2.01684 17.9832 1 15.9299 1H4.07007C2.02662 1 1 2.00706 1 4.03096V15.969C1 17.9929 2.02662 19 4.07007 19ZM11.0217 13.2118C10.3862 13.8865 9.65291 13.8865 9.01738 13.2118L5.06736 9.01738C4.75448 8.69473 4.75448 8.2352 5.02825 7.94188C5.34112 7.61923 5.82998 7.61923 6.11353 7.92232L10.0244 12.0581L13.9256 7.92232C14.2091 7.61923 14.6882 7.62901 15.0109 7.94188C15.2944 8.22542 15.2846 8.69473 14.9718 9.01738L11.0217 13.2118Z"
        fill={color}
      />
    </svg>
  );
};
