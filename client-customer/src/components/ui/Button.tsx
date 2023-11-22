import React from "react";
import { ReactNode } from "react";

const Button: React.FC<{ children: ReactNode; onHandleClick: () => void }> = ({
  children,
  onHandleClick,
}) => {
  return (
    <button
      type="submit"
      className="mt-0 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onHandleClick}
    >
      {children}
    </button>
  );
};

export default Button;
