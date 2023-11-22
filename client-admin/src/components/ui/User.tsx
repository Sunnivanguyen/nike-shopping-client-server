import React from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { BsBoxArrowRight } from "react-icons/bs";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const User: React.FC = () => {
  const { admin, logout } = useAuth();
  const { name, avatar } = admin;
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/login");
  }

  return (
    <div className="ml-5 flex items-center justify-start gap-2">
      <Link to="/setting">
        <img
          className="mr-3 inline-block h-10 w-10 rounded-full ring-2 ring-white"
          src={`${BASE_URL}/api/v1/admin/avatar/${
            avatar ? avatar : "default-user.jpg"
          }`}
          alt={name}
        />
      </Link>

      <div className="flex flex-col">
        <h3 className="text-white">Welcome, {admin.first_name}.</h3>
        <button
          className="flex items-center justify-start gap-3 text-white"
          onClick={handleClick}
        >
          Log out <BsBoxArrowRight />
        </button>
      </div>
    </div>
  );
};

export default User;
