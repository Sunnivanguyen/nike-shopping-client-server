import { useState } from "react";

import useProducts from "../../hooks/useProducts";
import useRoutes from "../../hooks/useRoutes";

import MobilFilterDialog from "../ui/MobileFilterDialog";
import FilterDialog from "../ui/FilterDialog";
import Spinner from "../ui/Spinner";

import SidebarComponent from "./SidebarComponent";
import { Outlet } from "react-router-dom";

export default function MainComponent() {
  const { isLoading } = useProducts();
  const { currentPage } = useRoutes();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <div className="h-full w-full bg-white dark:bg-dark-100">
      <div>
        {/* Mobile filter dialog */}
        <MobilFilterDialog
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
        />

        <main className=" max-w-10xl mt-0 px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              {currentPage.includes("new") ? "New Arrivals" : "BestSellers"}
            </h1>

            <FilterDialog
              mobileFiltersOpen={mobileFiltersOpen}
              setMobileFiltersOpen={setMobileFiltersOpen}
            />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            {/* Main */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Sidebar */}
              <SidebarComponent />

              {/* Main Part */}
              {isLoading ? (
                <div className="flex-columns flex items-center justify-center lg:col-span-4">
                  <Spinner />
                </div>
              ) : (
                <div className="lg:col-span-4">
                  <Outlet />
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
