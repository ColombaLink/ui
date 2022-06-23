import { isCapitalised } from "~/utils/isCapitalised";
import type { Color } from "~/types";

export const color = (name: Color | string, alpha?: number) => {
  if (name && isCapitalised(name[0])) {
    if (alpha === undefined) {
      return `rgba(var(--${name}))`;
    }
    return `rgba(var(--${name}-rgb),${alpha})`;
  }
  return name;
};
