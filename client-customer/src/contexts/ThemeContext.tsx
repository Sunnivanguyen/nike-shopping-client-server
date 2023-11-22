import { createContext, useEffect } from "react";
import { useStickyState } from "../hooks/useStickyState";

export type ThemeContextType = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<string>>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
type IProps = {
  children: React.ReactNode;
};

const ThemeProvider: React.FC<IProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useStickyState(false, "theme");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
    if (!darkMode) {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { ThemeProvider, ThemeContext };
