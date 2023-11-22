import { Outlet } from "react-router-dom";

import FooterComponent from "../components/partials/FooterComponent";
import HeaderComponent from "../components/partials/HeaderComponent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppLayout: React.FC = () => {
  return (
    <div className="h-full">
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AppLayout;
