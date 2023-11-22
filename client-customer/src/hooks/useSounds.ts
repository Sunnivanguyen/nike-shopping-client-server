import { SoundsContext } from "../contexts/SoundContext";
import { useContext } from "react";
const useSounds = () => {
  const context = useContext(SoundsContext);
  if (context === undefined)
    throw new Error("ProductContext was used outside of the ProductProvider");
  return context;
};

export default useSounds;
