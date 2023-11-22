import { MdOutlineLightMode, MdNightlight } from "react-icons/md";
import { IconContext } from "react-icons";
import React from "react";

import useTheme from "../../hooks/useTheme";
import useSounds from "../../hooks/useSounds";

const ToggleTheme: React.FC = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { playActive } = useSounds();

  function handleTheme() {
    setDarkMode((dark: boolean) => !dark);
    playActive();
  }

  return (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border-none hover:bg-slate-200 dark:opacity-90 dark:hover:bg-slate-500"
        onClick={handleTheme}
      >
        {darkMode ? (
          <MdOutlineLightMode className="text-white" />
        ) : (
          <MdNightlight />
        )}
      </button>
    </IconContext.Provider>
  );
};

export default ToggleTheme;
