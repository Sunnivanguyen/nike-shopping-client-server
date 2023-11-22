export interface IAdminAddress {
  id: number;
  admin_id: number;
  info: string;
  is_default: number;
}

export interface IUserAddress {
  id: number;
  user_id: number;
  info: string;
  is_default: number;
}
