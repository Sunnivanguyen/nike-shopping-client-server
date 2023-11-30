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

export interface IUser {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  avatar: string;
  status: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface IUserData {
  user: {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    avatar: string;
    status: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  addresses: {
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
  }[];
}
