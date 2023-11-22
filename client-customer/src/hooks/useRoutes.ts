import { useContext } from "react";
import { RoutesContext } from "../contexts/RouteContext";
const useRoutes = () => {
  const context = useContext(RoutesContext);
  if (context === undefined)
    throw new Error("ProductContext was used outside of the ProductProvider");
  return context;
};

export default useRoutes;
