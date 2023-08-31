import React from "react";
import { InputProps } from "../constants/types";

const Input: React.ElementType = ({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
}: InputProps) => {
  const fixedInputClass: string = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm";
  
  return (
    <>
      <div className="my-5">
        <label htmlFor={labelFor} className="sr-only">
          {labelText}
        </label>
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={fixedInputClass + customClass}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default Input;
