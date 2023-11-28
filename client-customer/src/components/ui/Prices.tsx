import React from "react";
// import { IPrice } from "../types/ProductTypes";
// import useProducts from "../hooks/useProducts";

const Prices: React.FC<{ price: number; discount: number }> = ({
  price,
  discount,
}) => {
  // const { afterDiscountPrice } = useProducts();
  return (
    <div>
      {price !== undefined && discount !== undefined && (
        <div className="flex items-center gap-5">
          {discount > 0 && (
            <p className="text-3xl tracking-tight text-slate-900 dark:text-white">
              ${new Intl.NumberFormat("en-US").format(price)}
            </p>
          )}
          <p
            className={`text-3xl tracking-tight   ${
              discount > 0
                ? "text-slate-500 line-through dark:text-slate-300"
                : "text-slate-900 dark:text-slate-50"
            }`}
          >
            ${new Intl.NumberFormat("en-US").format(price)}
          </p>

          {discount > 0 && (
            <p className="text-xl tracking-tight text-green-600 dark:text-red-700">
              {discount} % off
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Prices;
