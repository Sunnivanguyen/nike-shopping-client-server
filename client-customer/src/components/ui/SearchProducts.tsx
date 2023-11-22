import useProducts from "../../hooks/useProducts";
import { useRef, useEffect } from "react";
import SearchIcon from "./SearchIcon";

const SearchProducts = () => {
  const { query, setQuery } = useProducts();
  const inputEl: any = useRef(null);

  useEffect(() => {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter" && inputEl.current) {
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.addEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <div className="relative  ml-5 flex w-40 flex-wrap items-center justify-center md:w-48 lg:w-60 ">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="relative m-0 block  w-[9px] min-w-0 flex-auto rounded border border-solid border-neutral-600 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out placeholder:text-neutral-400 focus:z-[3] focus:border-dark-50 focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(12,23,42)]  focus:outline-none dark:border-white dark:text-white dark:focus:border-white dark:focus:text-white dark:focus:shadow-[inset_0_0_0_1px_rgb(255,255,255)] lg:w-48"
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon1"
        ref={inputEl}
      />
      <SearchIcon />
    </div>
  );
};

export default SearchProducts;
