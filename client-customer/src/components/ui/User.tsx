import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const User: React.FC = () => {
  const { user, logout } = useAuth();
  const { first_name, avatar } = user;
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/home");
  }

  return (
    <div className="ml-5 flex items-center justify-start gap-2">
      <Link to="/setting">
        {user.avatar ? (
          <img
            className="mr-3 inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={avatar}
            alt={first_name}
          />
        ) : (
          <FaUserCircle className="mr-3 inline-block h-10 w-10 text-black dark:text-white" />
        )}
      </Link>

      <div className="flex flex-col">
        <h3 className="dark:text-white">
          {first_name ? `Welcome, ${user.first_name}.` : "Welcome."}
        </h3>
        <button
          className="flex items-center justify-start gap-3 dark:text-white"
          onClick={handleClick}
        >
          Log out <BsBoxArrowRight />
        </button>
      </div>
    </div>
  );
};

export default User;
