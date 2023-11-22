import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Logo from "../../components/ui/Logo";
import ButtonMoveBack from "../../components/ui/ButtonMoveBack";

const LogInPage: React.FC = () => {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email || !password) {
      console.log("Have to type input");
    } else {
      login(email, password);
    }
  }

  return (
    <div className="mx-auto flex h-screen flex-1 flex-col justify-center px-6 py-12 align-middle dark:bg-dark-100 lg:px-8">
      <ButtonMoveBack />
      <div className="flex flex-col items-center justify-center gap-7 sm:mx-auto sm:w-full sm:max-w-sm">
        <Logo />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
          YOUR ACCOUNT FOR EVERYTHING NIKE
        </h2>
      </div>

      <div className="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/help"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="relative mt-2">
              <input
                id="password"
                name="password"
                type={show ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                className="absolute right-3 top-3"
                onClick={() => setShow((show) => !show)}
              >
                {show ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogInPage;
