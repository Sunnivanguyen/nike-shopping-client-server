export interface IAdminAddress {
  id: number;
  admin_id: number;
  address_line_1: string;
  address_line_2: string;
  city: string;
  region: string;
  country: string;
  postal_code: number;
  longitude: string;
  latitude: string;
  is_default: number;
}

export interface IUserAddress {
  id: number;
  user_id: number;
  address_line_1: string;
  address_line_2: string;
  city: string;
  region: string;
  country: string;
  postal_code: number;
  longitude: string;
  latitude: string;
  is_default: number;
}
