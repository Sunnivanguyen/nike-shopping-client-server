import React from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import useProducts from "../../hooks/useProducts";

export default function Counter({ id, quantity, setQuantity }) {
  const { decreaseCart, addToCart } = useProducts();

  const onIncreaseHandler = (event: React.MouseEvent<SVGElement>): void => {
    event.preventDefault();
    addToCart(id);
  };

  const onDescreaseHandler = (event: React.MouseEvent<SVGAElement>): void => {
    event.preventDefault();
    if (quantity > 0) {
      decreaseCart(id);
    }
  };

  return (
    <div className="flex w-[150px] items-center justify-around text-3xl">
      <AiOutlinePlusCircle
        onClick={onIncreaseHandler}
        className="text-dark-50 dark:text-white"
      />
      <input
        type="text"
        value={quantity}
        onChange={() => setQuantity(e.target.value)}
      />
      <AiOutlineMinusCircle
        onClick={onDescreaseHandler}
        className="text-dark-50 dark:text-white"
      />
    </div>
  );
}
