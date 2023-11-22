import React from "react";
import { FaBars, FaBarsStaggered } from "react-icons/fa6";
import useSounds from "../../hooks/useSounds";

type TProps = {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
};
const BarIcon: React.FC<TProps> = ({ setMobileMenuOpen, mobileMenuOpen }) => {
  const { playActive } = useSounds();
  function handleMobilMenu() {
    setMobileMenuOpen(true);
    playActive();
  }
  return (
    <button
      type="button"
      className="-m-2.5 flex  h-9 w-9 items-center  justify-center  rounded-full border-none p-2.5 text-gray-700 hover:bg-slate-200 dark:text-white dark:opacity-90 dark:hover:bg-slate-500"
      onMouseDown={handleMobilMenu}
      onMouseUp={playActive}
    >
      <span className="sr-only">Open main menu</span>
      {!mobileMenuOpen ? (
        <FaBars className="h-6 w-6" aria-hidden="true" />
      ) : (
        <FaBarsStaggered className="h-6 w-6" aria-hidden="true" />
      )}
    </button>
  );
};

export default BarIcon;
