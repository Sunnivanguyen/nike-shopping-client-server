import { createContext, useEffect, useReducer } from "react";

import { IUserData } from "../types/UserType";
import IChildrenProps from "../types/ChildrenType";
import { AuthContextType } from "../types/context/AuthContextType";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

const AuthContext = createContext<AuthContextType | null>(null);

type InitialState = {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  users: IUserData[];
  user: IUserData | null;
  userId: string | null;
  error: string | null;
};

const initialState: InitialState = {
  isAuthLoading: false,
  isAuthenticated: false,
  users: [],
  user: null,
  userId: null,
  error: "",
};

type Payload = boolean | IUserData[] | IUserData | string;

// Define the type for your action
interface Action {
  type: string;
  payload?: Payload;
}
function reducer(state: InitialState, action: Action): any {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isAuthLoading: true,
      };
    case "users/loaded":
      return {
        ...state,
        isAuthLoading: false,
        users: action.payload,
      };
    case "user/updated":
      return {
        ...state,
        isAuthLoading: false,
        user: action.payload,
      };
    case "signup":
      return {
        ...state,
        users: action.payload,
        isAuthenticated: false,
      };
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "rejected":
      return {
        ...state,
        isAuthLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}

const AuthProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [
    { users, user, userId, isAuthenticated, isAuthLoading, error },
    dispatch,
  ] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  function showToast(status: string, message: string) {
    if (status === "success") {
      toast.success(message);
    } else if (status === "error") {
      toast.error(message);
    }
  }

  async function login(dataLogin: { email: string; password: string }) {
    dispatch({ type: "loading" });

    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/user-login`,
        dataLogin,
      );

      const userData = {
        user: res.data.data.user,
        addresses: res.data.data.addresses,
      };

      dispatch({ type: "login", payload: userData });
      showToast("success", "Log in successfully");

      window.localStorage.setItem(
        "user_id",
        JSON.stringify(res.data.data.user.id),
      );
      window.localStorage.setItem("token", JSON.stringify(res.data.data.token));

      navigate("/home", { replace: true });
    } catch (error) {
      console.error(error);
      showToast("error", "Email has not been registed");
      dispatch({
        type: "rejected",
        payload: "There was an error loading user...",
      });
    }
  }

  async function fetchUser() {
    const userId = JSON.parse(window.localStorage.getItem("user_id") || "null");
    if (userId) {
      dispatch({ type: "loading" });
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/users/${userId}`);

        const userData = {
          user: res.data.data.user,
          addresses: res.data.data.addresses,
        };

        dispatch({
          type: "login",
          payload: userData,
        });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading user...",
        });
      }
      return;
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    window.localStorage.removeItem("user_id");
    window.localStorage.removeItem("token");
  }

  async function register(email: string, password: string) {
    dispatch({ type: "loading" });

    const dataLogin = { email, password };
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/auth/user-signup`,
        dataLogin,
      );

      dispatch({
        type: "signup",
        payload: res.data.data.user,
      });
      showToast("success", "Sign up successfully");

      navigate("/home", { replace: true });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error registering...",
      });

      showToast("error", "Email already existed!");
    }
  }

  async function updateUser(formData: any) {
    const userId = JSON.parse(window.localStorage.getItem("user_id") || "null");
    if (userId) {
      dispatch({ type: "loading" });
      try {
        const res = await axios.put(
          `${BASE_URL}/api/v1/users/${userId}`,
          formData,
        );
        dispatch({
          type: "user/updated",
          payload: res.data.data.user,
        });

        showToast("success", "Update User successfully");
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading user...",
        });

        showToast("error", "Fail to update user");
      }
      return;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        user,
        userId,
        isAuthenticated,
        isAuthLoading,
        login,
        logout,
        register,
        error,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
