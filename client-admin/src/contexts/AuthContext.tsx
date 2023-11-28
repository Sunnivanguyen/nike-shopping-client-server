import { createContext, useEffect, useReducer, useState } from "react";

import { IUser } from "../types/UserType";
import IChildrenProps from "../types/ChildrenType";
import { AuthContextType } from "../types/context/AuthContextType";
import { IAdminAddress } from "../types/AddressType";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.SERVER_BASE_URL;

const AuthContext = createContext<AuthContextType | null>(null);

type InitialState = {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  admins: IUser[];
  allAdminAdresses: IAdminAddress[];
  admin: IUser | null;
  adminAddresses: [];
  selectedAdmin: IUser | null;
  adminId: string | null;
  error: string | null;
};

const initialState: InitialState = {
  isAuthLoading: false,
  isAuthenticated: false,
  admins: [],
  allAdminAdresses: [],
  admin: null,
  adminAddresses: [],
  selectedAdmin: null,
  adminId: null,
  error: "",
};

// type Payload = boolean | IUser[] | IUser | string;

// // Define the type for your action
// interface Action {
//   type: string;
//   payload?: Payload;
// }
function reducer(state: InitialState, action: any): any {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isAuthLoading: true,
      };
    case "admins/loaded":
      return {
        ...state,
        isAuthLoading: false,
        admins: action.payload.admins,
        allAdminAddresses: action.payload.allAdminAddresses,
      };
    case "user/loaded":
      return {
        ...state,
        isUserLoading: false,
        admin: action.payload.admin,
        userAddresses: action.payload.adminAddresses,
      };
    case "signup":
      return {
        ...state,
        admins: action.payload,
        isAuthenticated: false,
      };
    case "login":
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
      };
    case "admin/updated":
      return {
        ...state,
        admin: action.payload.admin,
        adminAddresses: action.payload.adminAddress,
      };
    case "admin/added":
      return {
        ...state,
        admin: action.payload,
      };
    case "admin/deleted":
      return {
        ...state,
        admin: action.payload,
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
    {
      admins,
      allAdminAddresses,
      adminAddresses,
      admin,
      adminId,
      isAuthenticated,
      isAuthLoading,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, [admins.length]);

  useEffect(() => {
    fetchAdmin();
  }, []);

  useEffect(() => {
    if (selectedAdminId) fetchSelectedAdmin(selectedAdminId);
  }, [selectedAdminId]);

  function showToast(status: string, message: string) {
    if (status === "success") {
      toast.success(message);
    } else if (status === "error") {
      toast.error(message);
    }
  }

  async function fetchAdmins() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/admins`);
      // toast.success("Data loaded successfully");
      dispatch({
        type: "admins/loaded",
        payload: {
          admins: res.data.data.admins,
          adminAddresses: res.data.data.adminAddresses,
        },
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading admins...",
      });
    }
  }

  async function login(email: string, password: string) {
    dispatch({ type: "loading" });

    const dataLogin = { email, password };
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/admins/login`,
        dataLogin,
      );
      dispatch({ type: "login", payload: res.data.data.admin });
      showToast("success", "Log in successfully");

      window.localStorage.setItem(
        "admin_id",
        JSON.stringify(res.data.data.admin?.id),
      );
      window.localStorage.setItem("token", JSON.stringify(res.data?.token));

      navigate("/dashboard", { replace: true });
    } catch (error) {
      showToast("error", "Email has not been registed");
      dispatch({
        type: "rejected",
        payload: "There was an error loading admin...",
      });
    }
  }

  async function fetchAdmin() {
    const adminId = JSON.parse(
      window.localStorage.getItem("admin_id") || "null",
    );
    if (adminId) {
      dispatch({ type: "loading" });
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/admins/${adminId}`);
        console.log(res.data.data.admin);
        dispatch({
          type: "login",
          payload: res.data.data.admin,
        });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading admin...",
        });
      }
      return;
    }
  }

  async function fetchSelectedAdmin(selectedAdminId: number) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/admins/${selectedAdminId}`,
      );
      dispatch({
        type: "login",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading admin...",
      });
    }
  }

  async function updateAdmin(adminId: number, updatedData: object) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/admins/${adminId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      dispatch({
        type: "admin/updated",
        payload: res.data.data,
      });
      // showToast("success", "Update Admin successfully");
    } catch (error) {
      showToast("error", "There was an error updating admin...");
      dispatch({
        type: "rejected",
        payload: "There was an error updating admin...",
      });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
    window.localStorage.removeItem("admin_id");
    window.localStorage.removeItem("token");
  }

  async function addAdmin(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    avatar: string,
    status: number,
  ) {
    dispatch({ type: "loading" });

    const addingData = {
      email,
      password,
      first_name,
      last_name,
      phone_number,
      avatar,
      status,
    };
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/admins`, addingData);

      dispatch({
        type: "admin/added",
        payload: res.data.admin,
      });
      showToast("success", "Adding admin successfully");

      navigate("/home", { replace: true });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error adding Admin...",
      });

      showToast("error", "Wrong Email or Password");
    }
  }

  async function deleteAdmin(adminId: number) {
    dispatch({ type: "loading" });

    try {
      await axios.delete(`${BASE_URL}/api/v1/admins/${adminId}/soft-delete`);
      showToast("success", "Deleting admin successfully");
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting admin...",
      });

      showToast("error", "There was an error deleting admin");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthLoading,
        allAdminAddresses,
        isAuthenticated,
        admins,
        adminAddresses,
        admin,
        adminId,
        login,
        logout,
        error,
        selectedAdminId,
        setSelectedAdminId,
        updateAdmin,
        deleteAdmin,
        fetchAdmins,
        fetchSelectedAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
