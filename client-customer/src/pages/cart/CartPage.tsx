import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
// import OrderPrice from "../../components/OrderPrice";
import Counter from "../../components/ui/Counter";
import { MdDeleteForever } from "react-icons/md";
import Button from "../../components/ui/Button";

import useProducts from "../../hooks/useProducts";
import useSounds from "../../hooks/useSounds";
import { ICartItem } from "../../types/CartType";
import CartItemImage from "./CartItemImage";
import CartItemCheckBox from "./CartItemCheckBox";

const CustomerCartPage: React.FC = () => {
  const { cart, deleteCart, totalOrderPrice, checkout, quantity, setQuantity } =
    useProducts();
  const [checkedCartList, setCheckedCartList] = useState<number[] | []>([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const { playActive } = useSounds();
  const navigate = useNavigate();

  function handleCheckAll(e: React.ChangeEvent<HTMLInputElement>) {
    const isCheckedAll = e.target.checked;
    setIsCheckedAll(isCheckedAll);
    if (isCheckedAll) {
      setCheckedCartList(cart.map((item: ICartItem) => item.product_id));
    }
    if (!isCheckedAll) {
      setCheckedCartList([]);
    }
  }

  function handleCheckOut() {
    checkout();

    navigate("/home");
  }

  return (
    <main className=" max-w-10xl mt-0 h-full bg-white px-4 dark:bg-dark-100 sm:px-6 lg:px-8">
      <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Shopping Cart
        </h1>
      </div>
      <div className="flex gap-4">
        <div className="mx-[20px] max-w-2xl px-4 py-5 sm:px-6 sm:py-10 lg:max-w-5xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid-rows grid gap-4">
            {cart?.length > 0 &&
              cart.map((cart: ICartItem) => (
                <div
                  key={crypto.randomUUID()}
                  className="flex h-[200px] w-full items-center justify-start gap-10 border-b border-gray-200"
                >
                  <Link to={`${cart.product_code}`}>
                    <CartItemImage cart={cart} />
                  </Link>
                  <h3 className="mt-2 text-sm text-dark-50 dark:text-white">
                    {cart.product_name}
                  </h3>
                  <div className="flex flex-col gap-5">
                    <h4 className=" mt-2 text-sm text-dark-50 dark:text-white">
                      Color: {cart.product_color}
                    </h4>
                    <h4 className=" mt-2 text-sm text-dark-50 dark:text-white">
                      Size: {`${cart.product_size}`}
                    </h4>
                  </div>
                  <div className="w-[400px]">
                    {/* <OrderPrice
                    price={product.price}
                    discount={product.discount}
                  /> */}
                  </div>
                  {/* <Counter id={product.id} quantity={product.quantity} />
                <MdDeleteForever
                  className="text-3xl text-dark-50 dark:text-white"
                  onClick={() => deleteCart(product.id)}
                /> */}
                  <CartItemCheckBox
                    setCheckedCartList={setCheckedCartList}
                    checkedCartList={checkedCartList}
                    productId={cart.product_id}
                    setIsCheckedAll={setIsCheckedAll}
                  />
                  <MdDeleteOutline className="text-3xl text-dark-50 dark:text-white" />
                </div>
              ))}
          </div>
        </div>
        {cart?.length > 0 && (
          <div className="mx-[20px] grid h-[350px] w-[20%] grid-rows-2 items-center gap-4 px-4 py-16 sm:px-0 sm:py-24  lg:px-0">
            <div className="mx-1 flex items-center justify-start gap-4">
              <label
                htmlFor="select-all"
                id="select-all"
                className="text-xl text-black dark:text-white"
              >
                Select All
              </label>
              <input
                name="select-all"
                value={isCheckedAll}
                type="checkbox"
                className="dark:border-white-600 h-5 w-5 rounded border  border-gray-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-cyan-600"
                onChange={handleCheckAll}
                onMouseDown={playActive}
              />
            </div>
            <h2 className="text-xl text-black dark:text-white">
              Total: {totalOrderPrice}
            </h2>
            <Button onHandleClick={handleCheckOut}>CheckOut</Button>
          </div>
        )}
      </div>
    </main>
  );
};
export default CustomerCartPage;
