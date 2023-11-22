import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import useSounds from "../../hooks/useSounds";
const SearchIcon: React.FC = () => {
  const { playActive } = useSounds();

  function handleSearch() {
    console.log("work");
    playActive();
  }

  return (
    <button
      className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border-none hover:bg-slate-200 dark:opacity-90 dark:hover:bg-slate-500"
      onClick={handleSearch}
    >
      <BiSearchAlt className="h-8 w-6 text-black dark:text-white" />
    </button>
  );
};

export default SearchIcon;
