import { useContext } from "react";
import { ProductsContext } from "../contexts/ProductContext";

const useProducts = () => {
  const context = useContext(ProductsContext);
  if (context === undefined)
    throw new Error("ProductContext was used outside of the ProductProvider");
  return context;
};

export default useProducts;
