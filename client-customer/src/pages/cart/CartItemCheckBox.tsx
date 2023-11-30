import React, { useState } from "react";
import useSounds from "../../hooks/useSounds";
const CartItemCheckBox: React.FC<{
  setCheckedCartList: React.Dispatch<React.SetStateAction<number[]>>;
  checkedCartList: number[];
  setIsCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
  productId: number;
}> = ({ setCheckedCartList, checkedCartList, productId, setIsCheckedAll }) => {
  const { playActive } = useSounds();
  const [isChecked, setIsChecked] = useState(() =>
    checkedCartList.includes(productId) ? true : false,
  );

  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    setCheckedCartList((prev: number[]) =>
      isChecked
        ? [...prev, productId]
        : prev.filter((id) => {
            return id === productId;
          }),
    );
    if (isChecked) {
      setIsCheckedAll(false);
    }
  }

  return (
    <div className="mx-1 flex items-center justify-start gap-4">
      <input
        name="check-cart"
        value={isChecked}
        onChange={handleCheck}
        type="checkbox"
        className="dark:border-white-600 h-5 w-5 rounded border  border-gray-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-cyan-600"
        onMouseDown={playActive}
      />
    </div>
  );
};

export default CartItemCheckBox;
