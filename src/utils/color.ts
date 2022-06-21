import type { Color } from "~/types";

export function color(name: Color, alpha?: number) {
  if (alpha === undefined) {
    return `rgba(var(--${name}))`;
  }
  return `rgba(var(--${name}-rgb),${alpha})`;
}
