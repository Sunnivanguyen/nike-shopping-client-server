import { Fragment } from "react";
import { SetStateAction, Dispatch } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { TFeature, IFeature } from "../../types/NavBarType";

import useTheme from "../../hooks/useTheme";
import useRoutes from "../../hooks/useRoutes";
import { navbarFeatures } from "../../contexts/RouteContext";
import BarsIcon from "./BarIcon";

type TProps = {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  mobileMenuOpen: boolean;
};

const NavbarDropDown: React.FC<TProps> = ({
  setMobileMenuOpen,
  mobileMenuOpen,
}) => {
  const { setCurrentPage } = useRoutes();
  const { darkMode } = useTheme();

  function handleClick(href: string) {
    setCurrentPage(href);
  }

  return (
    <>
      <div className="flex lg:hidden">
        <BarsIcon
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
      </div>
      {navbarFeatures.map((item: IFeature) => (
        <Popover.Group
          className="hidden lg:flex lg:gap-x-12"
          key={crypto.randomUUID()}
        >
          <Popover className="relative">
            <Popover.Button
              className={`flex items-center gap-x-1 text-sm font-semibold leading-6 ${
                darkMode ? "text-white" : "text-gray-900"
              } outline-none`}
            >
              {item.name}
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {item.features.map((feature: TFeature) => (
                    <div
                      key={crypto.randomUUID()}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      onClick={() => handleClick(feature.href)}
                    >
                      <div className="flex-auto">
                        <Link
                          to={`${feature.href}`}
                          className="block font-semibold text-gray-900"
                        >
                          {feature.name}
                          <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </Popover.Group>
      ))}
    </>
  );
};

export default NavbarDropDown;
