import { IUser } from "../UserType";

export type AuthContextType = {
  users: IUser[];
  isAuthLoading: boolean;
  user: IUser | null;
  userId: string | null;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (email: string, password: string) => void;
};
