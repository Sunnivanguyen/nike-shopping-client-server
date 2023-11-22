import { useState } from "react";
import Logo from "../ui/Logo";
import LoginButton from "../ui/LoginButton";
import NavbarDropDown from "../ui/NavbarDropDown";
import DialogPanel from "../ui/DialogPanel";
import SearchProducts from "../ui/SearchProducts";
import ToggleTheme from "../ui/ToggleTheme";
import CartIcon from "../ui/CartIcon";
import HeartIcon from "../ui/HeartIcon";
import useAuth from "../../hooks/useAuth";
import User from "../ui/User";

const HeaderComponent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-slate-100 bg-white dark:bg-dark-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Logo />
        </div>
        <NavbarDropDown
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
        <SearchProducts />
        <ToggleTheme />
        <HeartIcon />
        <CartIcon />
        {isAuthenticated && user ? <User /> : <LoginButton />}
      </nav>
      <DialogPanel
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
};
export default HeaderComponent;
