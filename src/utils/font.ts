import type { Color, Size } from "~/types";
import { color } from "./color";

export function font(
  size: Size = "md",
  colorProp: Color = "TextPrimary",
  weight = 500
) {
  return {
    fontSize: `var(--size-${size})`,
    lineHeight: `var(--line-${size})`,
    fontWeight: weight,
    color: color(colorProp),
  };
}
