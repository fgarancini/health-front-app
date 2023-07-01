import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
type Props = {}

const CustomDatePicker = (props: Props) => {
  return (
    <div className="col-span-3">
    <label className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900">
      Birthdate
    </label>
    <div className="mt-2">
      <DatePicker
        selected={new Date()}
        onChange={(date) => console.log(date)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 max-h-9 "
      />
    </div>
  </div>
  )
}

export default CustomDatePicker