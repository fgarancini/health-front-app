import { useFormik } from "formik";
import styles from "../styles/login.module.css";
import Input from "../components/Input";
import CustomSelect from "../components/CustomSelect";
import CustomDatePicker from "../components/CustomDatePicker";
import * as Yup from "yup";
import { GenderOption, UserInitialState } from "../interfaces/interfaces";
import { AuthApi } from "../api/auth.api";
import { apiInstance } from "../../shared/api/api";

const RegisterForm = () => {
  const { handleChange, setFieldValue, handleSubmit, values, touched, errors } =
    useFormik({
      validateOnChange: true,
      initialValues: {
        first_name: "",
        last_name: "",
        gender: undefined,
        birthdate: new Date(),
        email: "",
        password: "",
      },
      // enableReinitialize: true,
      validationSchema: Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        gender: Yup.object<GenderOption>().required("Required"),
        birthdate: Yup.date().required("Required"),
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      }),
      onSubmit: (values: UserInitialState) => {
        // console.log("🚀 ~ file: RegisterForm.tsx:32 ~ RegisterForm ~ values:", values)

        AuthApi.getInstance().register(
          values.first_name,
          values.last_name,
          values.gender?.label,
          values.birthdate,
          values.email,
          values.password
        );
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles.register}  shadow-lg shadow-cyan-200/70`}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base underline underline-offset-2 decoration-1 decoration-black-300 font-semibold leading-7 text-gray-900">
              Register
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-5 sm:grid-cols-6">
              <Input
                label="First Name"
                type="text"
                name="first_name"
                className="sm:col-span-full"
                onChange={handleChange}
                value={values.first_name}
                error={errors.first_name}
                touched={touched.first_name}
              />
              <Input
                label="Last name"
                type="text"
                name="last_name"
                className="sm:col-span-full"
                onChange={handleChange}
                value={values.last_name}
                error={errors.last_name}
                touched={touched.last_name}
              />
              <CustomSelect
                label="Gender"
                options={[
                  { value: 0, label: "male" },
                  { value: 1, label: "female" },
                ]}
                onChange={async (selectedOption) =>
                  await setFieldValue("gender", selectedOption)
                }
                values={values.gender}
                name="gender"
                error={errors.gender}
                touched={touched.gender}
              />{" "}
              <CustomDatePicker />
              <Input
                label="Email"
                type="email"
                name="email"
                className="col-span-full"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                touched={touched.email}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                className="col-span-full"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                touched={touched.password}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <button
            type="submit"
            className="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
