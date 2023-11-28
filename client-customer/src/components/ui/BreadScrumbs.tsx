import React from "react";
import { Link } from "react-router-dom";
import IBreadscrumbs from "../../types/IBreadScrumbs";

const BreadScrumbs: React.FC<{
  breadScrumbs: IBreadscrumbs;
  sex: string;
}> = ({ breadScrumbs, sex }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        role="list"
        className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        <div className="flex items-center">
          <Link
            to={breadScrumbs.href}
            className="mr-2 text-sm font-medium text-inherit"
          >
            {sex}
          </Link>
          <svg
            width={16}
            height={20}
            viewBox="0 0 16 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-4 text-inherit"
          >
            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
          </svg>
        </div>
        <li className="text-sm">
          <p className="font-medium text-inherit hover:text-gray-600">
            {breadScrumbs.name}
          </p>
        </li>
      </ol>
    </nav>
  );
};

export default BreadScrumbs;
