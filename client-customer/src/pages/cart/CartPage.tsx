import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
// import OrderPrice from "../../components/OrderPrice";
import Counter from "../../components/ui/Counter";
import { MdDeleteForever } from "react-icons/md";
import Button from "../../components/ui/Button";

import useProducts from "../../hooks/useProducts";
import useSounds from "../../hooks/useSounds";
import { ICartItem } from "../../types/CartType";

const CustomerCartPage: React.FC = () => {
  const {
    carts,
    deleteCart,
    checkCart,
    checkAllCart,
    setIsChecked,
    setIsCheckedAll,
    isCheckedAll,
    isChecked,
    totalOrderPrice,
    checkout,
    quantity,
    setQuantity,
  } = useProducts();
  const { playActive } = useSounds();
  const navigate = useNavigate();

  function handleCheck(id) {
    setIsChecked(!isChecked);
    checkCart(id, isChecked);
  }

  function handleCheckAll(isCheckedAll) {
    setIsCheckedAll(!isCheckedAll);
    checkAllCart(isCheckedAll);
  }

  function handleCheckOut() {
    checkout();

    navigate("/vn/home");
  }

  return (
    <main className=" max-w-10xl mt-0 h-full bg-white px-4 dark:bg-dark-100 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Shopping Cart
        </h1>
      </div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid-rows grid gap-4">
          {carts &&
            carts.length > 0 &&
            carts.map((product: ICartItem) => (
              <div
                key={crypto.randomUUID()}
                className="flex h-[400px] w-full items-center justify-start gap-20 border-b border-gray-200"
              >
                <Link to={`${product.id}`} className="w-[280px]">
                  <div className="aspect-h-1 aspect-w-1 h-full w-[250px] overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={product.images[1].src}
                      alt={product.images[1].alt}
                      className="h-full w-full object-cover object-center hover:opacity-75"
                    />
                  </div>
                  <h3 className=" mt-2 text-xl text-dark-50 dark:text-white">
                    {product.product_name}
                  </h3>
                  <div className="flex gap-5">
                    <h4 className=" text-md mt-2 text-dark-50 dark:text-white">
                      Color: {product.color}
                    </h4>
                    <h4 className=" text-md mt-2 text-dark-50 dark:text-white">
                      Size: {`${product.size}`}
                    </h4>
                  </div>
                </Link>
                <div className="mx-1 flex items-center justify-start gap-4">
                  <input
                    name="check-cart"
                    value={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    type="checkbox"
                    className="dark:border-white-600 h-5 w-5 rounded border  border-gray-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-cyan-600"
                    onMouseDown={playActive}
                  />
                </div>
                <div className="w-[400px]">
                  {/* <OrderPrice
                    price={product.price}
                    discount={product.discount}
                  /> */}
                </div>
                <Counter id={product.id} quantity={product.quantity} />
                <MdDeleteForever
                  className="text-3xl text-dark-50 dark:text-white"
                  onClick={() => deleteCart(product.id)}
                />
              </div>
            ))}
        </div>
      </div>

      <div className="mx-auto grid w-[600px] grid-cols-3 items-center gap-4 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-1 flex items-center justify-start gap-4">
          <input
            name="select-all"
            value={isCheckedAll}
            type="checkbox"
            className="dark:border-white-600 h-5 w-5 rounded border  border-gray-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-cyan-600"
            onChange={() => handleCheckAll(isCheckedAll)}
            onMouseDown={playActive}
          />

          <label
            htmlFor="select-all"
            id="select-all"
            className="text-2xl text-black dark:text-white"
          >
            Select All
          </label>
        </div>
        <h2 className="text-2xl text-black dark:text-white">
          ${totalOrderPrice}
        </h2>
        <Button onHandleClick={handleCheckOut}>CheckOut</Button>
      </div>
    </main>
  );
};
export default CustomerCartPage;
