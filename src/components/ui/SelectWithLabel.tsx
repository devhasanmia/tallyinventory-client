import { UseFormRegister, FieldError } from "react-hook-form";

interface SelectWithLabelProps {
  label: string;
  id: string;
  name: string;
  options?: { value: string | number; label: string }[];
  register?: UseFormRegister<any>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError | undefined;
  defaultOption?: string;
  variant?: "blue" | "green" | "purple" | "teal" | "orange";
}

const colorMap = {
  blue: "focus:ring-blue-500",
  green: "focus:ring-green-500",
  purple: "focus:ring-purple-500",
  teal: "focus:ring-teal-500",
  orange: "focus:ring-orange-500",
};

const SelectWithLabel: React.FC<SelectWithLabelProps> = ({
  label,
  id,
  name,
  options,
  register,
  className = "",
  required = false,
  disabled = false,
  error,
  defaultOption = "Select an option",
  variant = "blue",
}) => {
  const focusColor = colorMap[variant];

  return (
    <div className="max-w-sm space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-black">
        {label}
      </label>
      <select
        id={id}
        {...(register ? register(name) : {})}
        required={required}
        disabled={disabled}
        className={`
          mt-1 block w-full py-2.5 sm:py-3 px-4 text-sm rounded-lg
          bg-gray-50 text-gray-800
          outline-none
          ${focusColor} focus:ring-2 focus:ring-opacity-50
          disabled:opacity-50 disabled:pointer-events-none
          ${error ? "focus:ring-red-500" : ""}
          ${className}
        `}
      >
        <option value="">{defaultOption}</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectWithLabel;
