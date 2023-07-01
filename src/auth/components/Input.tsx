import { ChangeEvent } from "react";

type Props = {
  label: string;
  type: string;
  name: string;
  className: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | undefined;
  error: string | undefined;
  touched: boolean | undefined;
};

const Input = ({
  label,
  type,
  name,
  className,
  onChange,
  value = "",
  error,
  touched
}: Props) => {
  return (
    <div className={`${className}`}>
      <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          onChange={onChange}
          value={value}
          className="p-2 bg-slate-200 block w-full rounded border-0 text-slate-800 py-2 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        />
        {touched && error && <div className="text-red-700 font text-xs flex">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
