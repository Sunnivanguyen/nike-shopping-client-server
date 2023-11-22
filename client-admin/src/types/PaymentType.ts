export interface IPayment {
  id: number;
  order_id: number;
  payment_date: string;
  payment_method: number;
  is_paid: number;
}
