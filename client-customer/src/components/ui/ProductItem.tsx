import React from "react";
import { Link } from "react-router-dom";
import { IProduct, IProductImage } from "../../types/ProductType";
import useProducts from "../../hooks/useProducts";

const BASE_URL = import.meta.env.VITE_BASE_URL;

type TProduct = {
  product: IProduct;
};
const ProductItem: React.FC<TProduct> = ({ product }) => {
  const { bestSellerImages } = useProducts();
  const { id, product_name, product_code, buy_price } = product;

  const image = bestSellerImages.find(
    (el: IProductImage) => el.product_id === id,
  );

  return (
    <div>
      <Link to={`${product_code}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={`${BASE_URL}/api/v1/product/image/${image.image_src}`}
            alt={image.image_alt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-inherit">{product_name}</h3>
        <p className="mt-1 text-lg font-medium text-inherit">
          ${new Intl.NumberFormat("en-US").format(Number(buy_price))}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
