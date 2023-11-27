export interface IOrder {
  id: number;
  order_code: string;
  user_id: number;
  status: number;
  delivery_fee: number;
  comment: string;
  payment_method: number;
  ordered_at: string;
  updated_at: string;
}

export interface IOrderDetail {
  id: number;
  order_id: number;
  product_id: number;
  quantity_ordered: number;
  product_size: number;
}
