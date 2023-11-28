import { createContext, useEffect, useReducer, useState } from "react";

import { IUser } from "../types/UserType";
import IChildrenProps from "../types/ChildrenType";
import { UserContextType } from "../types/context/UserContextType";

import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IUserAddress } from "../types/AddressType";

const BASE_URL = import.meta.env.SERVER_BASE_URL;

const UserContext = createContext<UserContextType | null>(null);

type InitialState = {
  isUserLoading: boolean;
  users: IUser[];
  allUserAdresses: IUserAddress[];
  user: IUser | null;
  userAddresses: IUserAddress[];
  userId: string | null;
  error: string | null;
};

const initialState: InitialState = {
  isUserLoading: false,
  users: [],
  allUserAdresses: [],
  user: null,
  userAddresses: [],
  userId: null,
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
        isUserLoading: true,
      };
    case "users/loaded":
      return {
        ...state,
        isUserLoading: false,
        users: action.payload.users,
        allUserAddresses: action.payload.userAddresses,
      };
    case "user/loaded":
      return {
        ...state,
        isUserLoading: false,
        user: action.payload.user,
        userAddresses: action.payload.userAddresses,
      };
    case "user/updated":
      return {
        ...state,
        user: action.payload.user,
        userAddresses: action.payload.userAddresses,
      };
    case "user/added":
      return {
        ...state,
        user: action.payload,
      };
    case "user/deleted":
      return {
        ...state,
        user: action.payload,
      };
    case "rejected":
      return {
        ...state,
        isUserLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action");
  }
}

const UserProvider: React.FC<IChildrenProps> = ({ children }) => {
  const [
    {
      users,
      allUserAddresses,
      user,
      userAddresses,
      userId,
      isUserLoading,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [users.length]);

  useEffect(() => {
    if (selectedUserId) fetchUser(selectedUserId);
  }, [selectedUserId]);

  function showToast(status: string, message: string) {
    if (status === "success") {
      toast.success(message);
    } else if (status === "error") {
      toast.error(message);
    }
  }

  async function fetchUsers() {
    dispatch({ type: "loading" });
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users`);
      // toast.success("Data loaded successfully");
      dispatch({
        type: "users/loaded",
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading users...",
      });
    }
  }

  async function updateUser(userId: number, updatedData: object) {
    dispatch({ type: "loading" });
    try {
      const res = await axios.put(
        `${BASE_URL}/api/v1/users/${userId}`,
        updatedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      dispatch({
        type: "user/updated",
        payload: res.data.data,
      });
      showToast("success", "Update User successfully");
    } catch (error) {
      showToast("error", "There was an error updating user...");
      dispatch({
        type: "rejected",
        payload: "There was an error loading user...",
      });
    }
  }

  async function fetchUser(selectedUserId: number) {
    dispatch({ type: "loading" });

    try {
      const res = await axios.get(`${BASE_URL}/api/v1/users/${selectedUserId}`);
      console.log(res.data.data);
      dispatch({
        type: "user/loaded",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error loading user...",
      });
    }
    return;
  }

  async function addUser(
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
      const res = await axios.post(`${BASE_URL}/api/v1/users`, addingData);

      dispatch({
        type: "user/added",
        payload: res.data.user,
      });
      showToast("success", "Adding user successfully");
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error adding user...",
      });

      showToast("error", "There was an error adding user");
    }
  }

  async function deleteUser(userId: number) {
    try {
      const res = await axios.delete(
        `${BASE_URL}/api/v1/users/${userId}/soft-delete`,
      );
      console.log(res);
      showToast("success", "Deleting user successfully");
    } catch (error) {
      showToast("error", "There was an error deleting user");
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        allUserAddresses,
        user,
        userAddresses,
        userId,
        isUserLoading,
        updateUser,
        addUser,
        error,
        selectedUserId,
        setSelectedUserId,
        fetchUser,
        fetchUsers,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
