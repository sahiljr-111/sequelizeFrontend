import React from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps {
  value?: string;
  label: string;
  type: "email" | "password" | "text" | "select";
  placeholder?: string;
  className?: string;
  options?: { value: string | number; label: string | number }[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  className,
  options,
  onChange,
  value,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  let inputField;
  let classList = `flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`;
  switch (type) {
    case "email":
      inputField = (
        <input
          type="email"
          value={value}
          onChange={onChange}
          {...register}
          placeholder={placeholder}
          className={classList}
        />
      );
      break;
    case "password":
      inputField = (
        <input
          type="password"
          value={value}
          onChange={onChange}
          {...register}
          placeholder={placeholder}
          className={classList}
        />
      );
      break;
    case "select":
      inputField = (
        <select {...register} onChange={onChange} className={classList}>
          <option value="">{label}</option>
          {options &&
            options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      );
      break;
    default:
      inputField = (
        <input
          type="text"
          onChange={onChange}
          value={value}
          {...register}
          placeholder={placeholder}
          className={classList}
        />
      );
  }

  return (
    <>
      <label
        htmlFor=""
        className="text-base inline-block font-medium text-gray-900"
      >
        {label} :
      </label>
      <div>{inputField}</div>
    </>
  );
};

export default InputField;
