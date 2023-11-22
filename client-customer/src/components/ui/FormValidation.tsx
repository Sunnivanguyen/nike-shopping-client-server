import React from "react";

const FormValidation: React.FC<{
  children: React.ReactNode;
  inputName: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  isSubmited: boolean;
}> = ({ children, inputName, value, type, setValue, isSubmited }) => {
  return (
    <>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-900 after:ml-0.5 after:text-red-500 after:content-['*'] dark:text-white">
          {inputName}
        </span>
        <div className="relative">
          <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="peer block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            required
          />
          {children}
        </div>
        <p
          className={`dark:text-red mb-2 text-sm text-pink-600 peer-invalid:visible ${
            isSubmited && !value.trim() ? "" : "invisible"
          }`}
        >
          {`Please provide a valid ${inputName.toLowerCase()}`}
        </p>
      </label>
    </>
  );
};

export default FormValidation;
