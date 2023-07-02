import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  onChange: (ate: Date | null) => void;
  label: string;
  name: string;
  error?: string | undefined;
  touched?: boolean | undefined;
  value?: Date;
};

const CustomDatePicker = ({
  onChange,
  label,
  name,
  error,
  touched = false,
  value = new Date(),
}: Props) => {
  return (
    <div className="col-span-3">
      <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <DatePicker
          showYearDropdown
          name={name}
          selected={value}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 max-h-9 "
        />
        {touched && error && (
          <div className="text-red-700 font text-xs flex">{error}</div>
        )}
      </div>
    </div>
  );
};

export default CustomDatePicker;
