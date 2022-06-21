import React from "react";

type CubeIconProps = {
  color?: string;
  size?: number;
};

export const CubeIcon = ({
  color = "currentColor",
  size = 20,
  ...props
}: CubeIconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.79332 1.24116C9.16032 1.02964 9.57647 0.918294 10.0001 0.918294C10.4237 0.918294 10.8398 1.02963 11.2068 1.24113L11.2084 1.24207L17.0389 4.57374L17.0418 4.57539L17.0417 4.5754C17.3417 4.7486 17.6002 4.98381 17.8004 5.26431C17.8476 5.3107 17.8894 5.36414 17.9242 5.42422C17.9543 5.4762 17.9774 5.53029 17.9939 5.58542C18.1617 5.92019 18.2497 6.29003 18.2501 6.66582L18.2501 6.66659V13.3333L18.2501 13.334C18.2496 13.7578 18.1378 14.174 17.9257 14.5409C17.7136 14.9079 17.4088 15.2125 17.0417 15.4244L17.0389 15.4261L11.2084 18.7578L11.2068 18.7587C10.9471 18.9084 10.6627 19.0079 10.3686 19.0533C10.2597 19.1148 10.134 19.1499 10.0001 19.1499C9.86615 19.1499 9.74044 19.1148 9.63161 19.0533C9.3374 19.0079 9.05304 18.9084 8.7933 18.7587L8.79175 18.7578L2.96131 15.4261L2.95842 15.4244C2.5914 15.2125 2.28656 14.9079 2.07447 14.5409C1.86239 14.174 1.75052 13.7578 1.75008 13.334L1.75008 13.3333V6.66659L1.75008 6.66582C1.75047 6.29035 1.83832 5.92082 2.00585 5.58626C2.02235 5.53085 2.04557 5.47647 2.07579 5.42422C2.11069 5.3639 2.1527 5.31026 2.20015 5.26374C2.40031 4.98349 2.65862 4.74849 2.95842 4.5754L2.96131 4.57373L2.96131 4.57374L8.79332 1.24116ZM10.7501 17.2921L16.2917 14.1254L16.293 14.1247C16.4317 14.0443 16.5468 13.929 16.627 13.7903C16.7075 13.6511 16.7499 13.4932 16.7501 13.3325V6.96985L10.7501 10.4406V17.2921ZM9.25008 10.4407V17.2921L3.70841 14.1254L3.70716 14.1247C3.56851 14.0443 3.45333 13.929 3.37313 13.7903C3.29274 13.6512 3.25031 13.4935 3.25008 13.3328V6.96995L9.25008 10.4407ZM10.4613 2.54277L15.9679 5.68941L10 9.14165L4.03214 5.68946L9.53885 2.54277L9.53886 2.54277L9.54175 2.5411C9.6811 2.46065 9.83917 2.41829 10.0001 2.41829C10.161 2.41829 10.3191 2.46065 10.4584 2.5411L10.4584 2.54111L10.4613 2.54277Z"
        fill={color}
      />
    </svg>
  );
};
