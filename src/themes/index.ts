import { parseTheme } from "../utils/parseTheme";
import { theme as dark } from "./dark";
import { theme as light } from "./light";

const themes = {
  light,
  dark,
};

const { documentElement } = document;
const colorSchemeMedia = matchMedia("(prefers-color-scheme: dark)");
let currentTheme;

const update = () => {
  const prefersDark = colorSchemeMedia.matches;
  const newTheme =
    documentElement.getAttribute("data-theme") ||
    (prefersDark ? "dark" : "light");

  if (newTheme !== currentTheme) {
    currentTheme = newTheme;
    parseTheme(themes[newTheme]);
  }
};

update();

// watch html data-theme attr
new MutationObserver(update).observe(documentElement, {
  attributes: true,
});

// watch media
colorSchemeMedia.addEventListener("change", update);
