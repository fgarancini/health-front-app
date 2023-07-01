import Select, {
  ActionMeta,
  GroupBase,
  MultiValue,
  OptionsOrGroups,
  PropsValue,
  SingleValue,
} from "react-select";

type Props = {
  options: OptionsOrGroups<
    {
      label: string;
      value: number;
    },
    GroupBase<{
      label: string;
      value: number;
    }>
  >;
  label: string;
  name: string;
  onChange: (
    newValue:
      | MultiValue<{ value: number; label: string }>
      | SingleValue<{ value: number; label: string }>,
    actionMeta: ActionMeta<{ value: number; label: string }>
  ) => void;
  values?:
    | PropsValue<{
        value: number;
        label: string;
      }>
    | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  isMulti?: boolean;
  required?: boolean;
};

const CustomSelect = ({
  label,
  options,
  name,
  values,
  touched,
  error,
  required = false,
  isMulti = false,
  onChange,
}: Props) => {
  const className = `bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
    isMulti ? "basic-multi-select" : ""
  }`;
  return (
    <div className="sm:col-span-3">
      <label
        className={`${
          required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
        } block text-sm font-medium leading-6 text-gray-900`}
      >
        {label}
      </label>
      <div className="mt-2">
        <Select
          className={className}
          classNamePrefix="select"
          isSearchable={true}
          name={name}
          options={options}
          isMulti={isMulti}
          onChange={onChange}
          styles={{
            control(base) {
              return { ...base, minHeight: "34px!important", color: "grey" };
            },
            option: (provided) => ({
              ...provided,
              color: "grey",
            }),
          }}
          value={values}
        />
      </div>
      {touched && error && (
        <div className="text-red-700 font text-xs flex">{error}</div>
      )}
    </div>
  );
};

export default CustomSelect;
