import React, { createElement, FC, useState } from "react";
import { color as c } from "~/utils";
import { slicePascalCase } from "~/utils/slicePascalCase";
import { styled } from "inlines";
import { Color } from "~/types";
import { LoadingIcon } from "~/icons";

export const Button: FC = ({
  color: colorProp = "Primary",
  children,
  ghost = false,
  outline = false,
  light = false,
  disabled = false,
  hover = false,
  loading = false,
  iconLeft,
  iconRight,
  onClick,
  style,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const colorBase = slicePascalCase(colorProp, 1);
  let color, bg, borderColor, hoverBg;

  if (ghost) {
    color = `${colorBase}Main`;
    hoverBg = `${colorBase}LightHover`;
  } else if (outline) {
    color = `${colorBase}Main`;
    borderColor = light
      ? `${colorBase}LightOutline`
      : `${colorBase}MainOutline`;
    bg = `${colorBase}Light`;
    hoverBg = `${bg}Hover`;
  } else if (light) {
    bg = `${colorBase}Light`;
    color = `${bg}Contrast`;
    hoverBg = `${bg}Hover`;
  } else {
    bg = `${colorBase}Main`;
    color = `${colorBase}MainContrast`;
    hoverBg = `${bg}Hover`;
  }

  if (hover) {
    bg = hoverBg;
  }

  if (onClick) {
    const onClickOrginal = onClick;
    onClick = async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const t = e.currentTarget;
      let isSet = false;
      const timer = setTimeout(() => {
        if (!isSet) {
          setIsLoading(true);
        }
      }, 100);
      try {
        await onClickOrginal(e);
      } catch (e) {
        console.error(`Unhandled error from async click "${e.message}"`);
        t.style.transform = "translateX(-10px)";
        setTimeout(() => {
          t.style.transform = "translateX(10px)";
          setTimeout(() => {
            t.style.transform = "translateX(0px)";
          }, 100);
        }, 100);
      }
      isSet = true;
      setIsLoading(false);
      clearTimeout(timer);
    };
  }

  if (isLoading) {
    loading = true;
  }

  if (loading) {
    disabled = true;
  }

  return (
    <styled.button
      disabled={disabled}
      onClick={onClick}
      style={{
        transition: "width 0.15s, transform 0.1s, opacity 0.15s",
        padding: "4px 8px",
        color: c(color),
        backgroundColor: c(bg),
        border: `1px solid ${borderColor ? c(borderColor) : "transparent"}`,
        borderRadius: 4,
        opacity: disabled ? 0.6 : 1,
        display: "flex",
        alignItems: "center",
        "&:hover": {
          backgroundColor: c(hoverBg),
        },
        ...style,
      }}
    >
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {iconLeft &&
            createElement(iconLeft, {
              size: 16,
              style: children || iconRight ? { marginRight: 8 } : null,
            })}
          {children}
          {iconRight &&
            createElement(iconRight, {
              size: 16,
              style: children || iconLeft ? { marginLeft: 8 } : null,
            })}
        </>
      )}
    </styled.button>
  );
};
