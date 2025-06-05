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
  defaultOption?: string
}

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
  defaultOption
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <select
        id={id}
        {...(register ? register(name) : {})}
        className={`mt-1 block w-full p-3 text-sm bg-green-50 focus-within:outline-1 focus-within:outline-green-200 border border-gray-300 rounded-lg ${className}`}
        required={required}
        disabled={disabled}
      >
        <option value="">{defaultOption}</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default SelectWithLabel;
