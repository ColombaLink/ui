import { useContext } from "react";
import { Context } from "../components/Provider";

export const useTheme = () => {
  const ctx = useContext(Context);
  console.log(ctx);
};
