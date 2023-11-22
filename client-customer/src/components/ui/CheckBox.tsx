import React, { useState } from "react";
import useSounds from "../../hooks/useSounds";
import { ICustomerOrder } from "../../types/OrderType";

type IProps = {
  name: string;
  onHandle: () => void;
  lable: string;
  cart: ICustomerOrder | null;
};

const CheckBox: React.FC<IProps> = ({ name, onHandle, lable }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { playActive } = useSounds();

  function handleOnChange() {
    setIsChecked(!isChecked);
    onHandle();
  }

  return (
    <div className="mx-1 flex items-center justify-start gap-4">
      <input
        name={name}
        checked={isChecked}
        type="checkbox"
        className="dark:border-white-600 h-5 w-5 rounded border  border-gray-300 text-cyan-600 focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-cyan-600"
        onChange={handleOnChange}
        onMouseDown={playActive}
      />
      {lable && (
        <label htmlFor={name} id={name} className="text-black dark:text-white">
          {lable}
        </label>
      )}
    </div>
  );
};

export default CheckBox;
