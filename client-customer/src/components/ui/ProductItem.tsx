import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "../../types/ProductType";

type TProduct = {
  product: IProduct;
};
const ProductItem: React.FC<TProduct> = ({ productDetail }) => {
  const { product, imageData } = productDetail;

  return (
    <div>
      <Link to={`${product.product_code}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-2xl xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={imageData[1].image_src}
            alt={imageData[1].image_alt}
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-inherit">{product.product_name}</h3>
        <p className="mt-1 text-lg font-medium text-inherit">
          ${new Intl.NumberFormat("en-US").format(Number(product.buy_price))}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
