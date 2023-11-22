import { Outlet } from "react-router-dom";
import Sidebar from "../components/partials/SidebarComponent";
import Header from "../components/partials/HeaderComponent";
import Main from "../components/partials/MainComponent";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppLayout() {
  return (
    <div className="flex h-[100vh] w-full justify-start overflow-hidden">
      <Sidebar />
      <main className="flex h-full w-full flex-col">
        <Header />
        <Main>
          <Outlet />
        </Main>
      </main>
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
}

export default AppLayout;
