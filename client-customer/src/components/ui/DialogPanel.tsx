import { Dialog, Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Logo from "./Logo";
import ToggleTheme from "./ToggleTheme";
import { TFeature, IFeature } from "../../types/NavBarType";
import { Link } from "react-router-dom";
import { SetStateAction, Dispatch } from "react";
import { navbarFeatures } from "../../contexts/RouteContext";
import useTheme from "../../hooks/useTheme";
import useRoutes from "../../hooks/useRoutes";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type TProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
};

const DialogPanel: React.FC<TProps> = ({
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  const { setCurrentPage } = useRoutes();
  const { darkMode } = useTheme();
  return (
    <Dialog
      as="div"
      className="lg:hidden"
      open={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    >
      <div className="fixed inset-0 z-10" />
      <Dialog.Panel
        className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto ${
          darkMode ? "bg-dark-50" : "bg-white"
        } px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10`}
      >
        <div className="flex items-center justify-between">
          <Logo />

          <button
            type="button"
            className={`-m-2.5 rounded-md p-2.5 ${
              darkMode ? "text-white" : "text-gray-700"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div
            className={`-my-6 divide-y ${
              darkMode ? "divide-white" : "divide-gray-500/10"
            }`}
          >
            <div className="space-y-2 py-6">
              {navbarFeatures.map((item: IFeature) => (
                <Disclosure as="div" className="-mx-3" key={item.name}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 ${
                          darkMode
                            ? "text-white hover:bg-gray-50 hover:text-gray-900"
                            : "text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none",
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...item.features].map((feature: TFeature) => (
                          <Link to={`/nike/${feature.href}`}>
                            <Disclosure.Button
                              key={feature.name}
                              as="a"
                              onClick={() => setCurrentPage(`${feature.href}`)}
                              className={`block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 ${
                                darkMode
                                  ? "text-white hover:bg-gray-50 hover:text-gray-900"
                                  : "text-gray-900 hover:bg-gray-50"
                              }`}
                            >
                              {feature.name}
                            </Disclosure.Button>
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>

            <div className="flex-start flex border-none py-6">
              <ToggleTheme />
            </div>

            <div className="py-6">
              <Link
                to="/login"
                className={`block rounded-lg  py-2.5 text-base font-semibold leading-7 selection:-mx-3 ${
                  darkMode
                    ? "text-white hover:bg-gray-50 hover:px-3 hover:text-gray-900"
                    : "text-gray-900 hover:bg-gray-50 hover:px-3 hover:text-gray-900"
                }`}
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
};

export default DialogPanel;
