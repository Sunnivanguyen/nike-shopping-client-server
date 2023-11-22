import React, { useState } from "react";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import useSounds from "../../hooks/useSounds";
import useProducts from "../../hooks/useProducts";
import useAuth from "../../hooks/useAuth";

import AlertToLoginModal from "./AlertToLoginModal";

const CartIcon: React.FC = () => {
  const { playActive } = useSounds();
  const { carts } = useProducts();
  const { user } = useAuth();
  const navigate = useNavigate();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    navigate("/login");
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleClick() {
    if (user) navigate("/carts");
    else {
      openModal();
    }
  }

  return (
    <>
      {isOpen && (
        <AlertToLoginModal
          message={"add product to cart"}
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
      <div
        className="relative mx-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-200 dark:opacity-90 dark:hover:bg-slate-500"
        onClick={playActive}
      >
        <button onClick={handleClick}>
          <TiShoppingCart className="h-7 w-7 text-black dark:text-white" />
        </button>
        <div className="absolute -right-2 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-dark-50 text-sm text-white dark:bg-indigo-600">
          {carts ? carts.length : 0}
        </div>
      </div>
    </>
  );
};

export default CartIcon;
