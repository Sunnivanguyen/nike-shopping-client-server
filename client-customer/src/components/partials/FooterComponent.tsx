import React from "react";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const FooterComponent: React.FC = () => {
  return (
    <footer className="border-t-2 border-slate-100 bg-dark-50">
      <div className="container mx-auto px-6 py-12">
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <div>
            <h3 className="py-2 text-sm font-medium text-white">
              FIND A STORE
            </h3>
            <Link to="register">
              <h3 className="py-2 text-sm font-medium text-white">
                BECOME A MEMBER
              </h3>
            </Link>
            <h3 className="py-2 text-sm font-medium text-white">
              Send Us Feedback
            </h3>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">GET HELP</h3>

            <div className="mt-4 flex flex-col items-start space-y-4">
              <Link
                to="order"
                className="text-gray-300  transition-colors duration-200 hover:text-white   "
              >
                Order Status
              </Link>
              <Link
                to="error"
                className="text-gray-300  transition-colors duration-200 hover:text-white  "
              >
                Delivery
              </Link>
              <a
                href="#"
                className="text-gray-300  transition-colors duration-200 hover:text-white  "
              >
                Returns
              </a>
              <a
                href="#"
                className="text-gray-300  transition-colors duration-200 hover:text-white  "
              >
                Payment Options
              </a>
              <a
                href="#"
                className="text-gray-300  transition-colors duration-200 hover:text-white  "
              >
                Contact Us
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">ABOUT NIKE</h3>

            <div className="mt-4 flex flex-col items-start space-y-4">
              <a
                href="#"
                className="text-gray-300  transition-colors duration-200 hover:text-white  "
              >
                News
              </a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="flex items-center gap-2 text-gray-300 ">
            <MdLocationOn /> Vietnam
          </p>
          <p className="mt-4 text-sm text-gray-300  sm:mt-0">
            © 2023 Nike, Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
