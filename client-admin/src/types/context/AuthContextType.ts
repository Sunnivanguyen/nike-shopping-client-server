import { IUser } from "../UserType";

export type AuthContextType = {
  isAuthLoading: boolean;
  isAuthenticated: boolean;
  admins: IUser[];
  admin: IUser | null;
  adminId: string | null;
  error: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};
