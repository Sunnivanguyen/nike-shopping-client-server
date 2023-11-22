import Logo from "../ui/Logo";
import LoginButton from "../ui/LoginButton";

// import SearchProducts from "../ui/SearchProducts";

import useAuth from "../../hooks/useAuth";
import User from "../ui/User";

const HeaderComponent: React.FC = () => {
  const { isAuthenticated, admin } = useAuth();

  return (
    <header className="border-b-2 border-slate-100  bg-dark-50 px-[30px]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>

        {/* <SearchProducts /> */}

        {isAuthenticated && admin ? <User /> : <LoginButton />}
      </nav>
    </header>
  );
};
export default HeaderComponent;
