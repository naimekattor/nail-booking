import { IconType } from "react-icons";

interface FormInputProps {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  Icon: IconType;
}

const FormInput = ({ id, label, type, placeholder, Icon }: FormInputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-600 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <Icon
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default FormInput;
