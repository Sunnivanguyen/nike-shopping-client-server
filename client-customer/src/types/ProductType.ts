export interface IProduct {
  id: number;
  product_code: string;
  pre_code: string;
  product_name: string;
  product_launch_date: string;
  buy_price: number;
  sex: number;
  category_id: number;
  product_color: string;
  product_description: string;
  sales_volume: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface IProductDetail {
  id: number;
  product_id: number;
  text: string;
}

export interface IProductHighlight {
  id: number;
  product_id: number;
  text: string;
}

export interface IProductImage {
  id: number;
  product_id: number;
  product_code: string;
  image_src: string;
  image_alt: string;
}

export interface IProductSize {
  id: number;
  product_id: number;
  size_id: number;
  in_stock: number;
}
