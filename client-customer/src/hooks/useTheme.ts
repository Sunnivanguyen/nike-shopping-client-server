import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("ThemeContext was used outside of the ThemeProvider");
  return context;
};

export default useTheme;
