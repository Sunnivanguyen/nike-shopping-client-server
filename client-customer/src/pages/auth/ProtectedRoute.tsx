import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// import { useEffect } from "react";
import IChildrenProps from "../../types/ChildrenType";

const ProtectedRoute: React.FC<IChildrenProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuthenticated) navigate("/home");
  // }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
