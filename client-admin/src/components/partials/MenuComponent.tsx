import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { FaUserShield } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingCart, FiUserPlus } from "react-icons/fi";
import { PiSneakerMoveBold } from "react-icons/pi";
import { AiOutlineSetting, AiOutlineEdit } from "react-icons/ai";
import { BiSolidUserDetail } from "react-icons/bi";

import { useNavigate } from "react-router-dom";

const Menu = (props) => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="flex w-full max-w-md flex-col gap-1 px-2">
        {/* Dashboard */}
        <button
          className="flex w-full items-center justify-between rounded-lg border-2  bg-white px-6 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          onClick={() => navigate("/dashboard")}
        >
          <span className="flex items-center gap-4">
            <LuLayoutDashboard />
            DashBoard
          </span>
        </button>
        {/* Admins */}
        <button
          className="flex w-full items-center justify-between rounded-lg border-2  bg-white px-6 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          onClick={() => navigate("/admins")}
        >
          <span className="flex items-center gap-4">
            <FaUserShield />
            Admins
          </span>
        </button>
        {/* Users */}
        <button
          className="flex w-full items-center justify-between rounded-lg border-2  bg-white px-6 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          onClick={() => navigate("/users")}
        >
          <span className="flex  items-center gap-4">
            <BiSolidUserDetail size="24" />
            Users
          </span>
        </button>
        {/* Orders */}
        <button
          className="flex w-full items-center justify-between rounded-lg border-2  bg-white px-6 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          onClick={() => navigate("/orders")}
        >
          <span className="flex items-center gap-4">
            <FiShoppingCart />
            Orders
          </span>
        </button>
        {/* Products */}
        <button
          className="flex w-full items-center justify-between rounded-lg border-2  bg-white px-6 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          onClick={() => navigate("/products")}
        >
          <span className="flex items-center gap-4">
            <PiSneakerMoveBold />
            Products
          </span>
        </button>
        {/* Setting */}
        <Disclosure as="div" className="">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg border-2  bg-white px-6 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="flex items-center gap-4">
                  <AiOutlineSetting />
                  Setting
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="bg-dark:100 flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-white  hover:bg-slate-50 hover:text-dark-100">
                <span
                  className="flex items-center gap-4"
                  onClick={() => navigate("/edit-admin")}
                >
                  <AiOutlineEdit />
                  Edit Admin
                </span>
              </Disclosure.Panel>
              <Disclosure.Panel className="bg-dark:100 flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-white  hover:bg-slate-50 hover:text-dark-100">
                <span
                  className="flex items-center gap-4"
                  onClick={() => navigate("/setting")}
                >
                  <FiUserPlus />
                  Add Admin
                </span>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default Menu;

{
  /* <Disclosure as="div" className="">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg border-2 border-purple-900 bg-purple-100 px-6 py-2 text-left text-lg font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="flex items-center gap-4">
                  <FaUserShield />
                  Admins
                </span>
                <ChevronUpIcon
                  className={`${
                    open ? "rotate-180 transform" : ""
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="flex w-full justify-between rounded-lg border-2 border-purple-900 bg-purple-100 px-4 py-2 text-left text-sm font-medium text-dark-50 hover:bg-purple-50">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure> */
}
