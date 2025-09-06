import { ReactNode } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputWithLabelProps {
  label: string | ReactNode;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError | undefined;
  variant?: "blue" | "green" | "purple" | "teal" | "orange";
}

const colorMap = {
  blue: "focus:ring-blue-500",
  green: "focus:ring-green-500",
  purple: "focus:ring-purple-500",
  teal: "focus:ring-teal-500",
  orange: "focus:ring-orange-500",
};

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  id,
  name,
  type = "text",
  placeholder = "",
  register,
  className = "",
  required = false,
  disabled = false,
  error,
  variant = "blue",
}) => {
  const focusColor = colorMap[variant];

  return (
    <div className="max-w-sm space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-black">
        {label}
      </label>
      <input
        {...(register ? register(name) : {})}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`
          py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm text-gray-800
          bg-gray-50
          outline-none
          ${focusColor} focus:ring-2 focus:ring-opacity-50
          disabled:opacity-50 disabled:pointer-events-none
          ${error ? "focus:ring-red-500" : ""}
          ${className}
        `}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default InputWithLabel;
