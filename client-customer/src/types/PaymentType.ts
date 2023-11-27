export interface IOrderPayment {
  id: number;
  order_id: number;
  user_payment_id: number;
}

export interface IPaymentMethod {
  id: number;
  method: number;
}

export interface IUserPayment {
  id: number;
  user_id: number;
  payment_method_id: number;
  card_type: string;
  amount: number;
  name_on_card: string;
  card_number: string;
  expire_date: string;
  cvc: string;
  is_default: number;
  created_at: string;
  updated_at: string;
}
