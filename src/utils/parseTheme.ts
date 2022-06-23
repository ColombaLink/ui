import { toRGBA } from "./toRGBA";

export const parseTheme = (theme) => {
  for (const i in theme.colors) {
    const color = toRGBA(theme.colors[i]);
    theme.colors[i] = color;
    document.body.style.setProperty(`--${i}`, color.join(","));
    document.body.style.setProperty(`--${i}-rgb`, color.slice(0, 3).join(","));
  }

  for (const i in theme.fontSizes) {
    document.body.style.setProperty(`--size-${i}`, theme.fontSizes[i]);
  }

  for (const i in theme.lineHeights) {
    document.body.style.setProperty(`--line-${i}`, theme.lineHeights[i]);
  }

  return theme;
};
