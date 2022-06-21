import { createContext } from "react";
import { theme as light } from "~/themes/light";
import { theme as dark } from "~/themes/dark";

export const Context = createContext({
  theme: {
    light,
    dark,
  },
});

export const Provider = Context.Provider;
