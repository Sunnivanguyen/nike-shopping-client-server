import { IUser } from "../UserType";

export type UserContextType = {
  isUserLoading: boolean;
  users: IUser[];
  user: IUser | null;
  userId: string | null;
  error: string | null;
  updateUser: (userId: number, updatedData: object) => void;
  addUser: (
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    phone_number: string,
    avatar: string,
    status: number,
  ) => void;
  setSelectedUserId: React.Dispatch<React.SetStateAction<null>>;
  fetchUsers: () => void;
  deleteUser: (userId: number) => void;
};
