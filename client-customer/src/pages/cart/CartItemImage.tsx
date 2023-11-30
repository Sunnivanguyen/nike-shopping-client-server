import React from "react";
import { ICartItem } from "../../types/CartType";
import useProducts from "../../hooks/useProducts";
// import { IProduct } from "../../types/ProductType";

const CartItemImage: React.FC<{ cart: ICartItem }> = ({ cart }) => {
  const { products } = useProducts();
  const product = products?.find(
    (product) => product.product.id === cart.product_id,
  );
  const images = product?.imageData;

  return (
    <div className="aspect-h-1 aspect-w-1 h-[90px] w-[120px] overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
        src={images[1].image_src}
        alt={images[1].image_alt}
        className="h-full w-full object-cover object-center hover:opacity-75"
      />{" "}
    </div>
  );
};
export default CartItemImage;
