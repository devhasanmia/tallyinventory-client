import { FieldError, UseFormRegister } from "react-hook-form";

interface InputWithLabelProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  register?: UseFormRegister<any>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  error?: FieldError | undefined;
}

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
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        {...(register ? register(name) : {})}
        type={type}
        id={id}
        name={name}
        className={`mt-1 block w-full p-3 text-sm bg-green-50 focus-within:outline-1 focus-within:outline-green-200 border border-gray-300 rounded-lg ${className}`}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
      />
      {error && (
        <p className="text-red-600 text-xs mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputWithLabel;
