import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { AuthApi } from "../api/auth.api";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomSelect from "../components/CustomSelect";
import Input from "../components/Input";
import {
  ErrorValidationResponse,
  GenderOption,
  UserInitialState,
} from "../interfaces/interfaces";
import styles from "../styles/login.module.css";
import Loader from "../../shared/components/Loader";

const RegisterForm = () => {
  const [registerCompleted, setRegisterCompleted] = useState<boolean>(false);
  const {
    handleChange,
    setFieldValue,
    handleSubmit,
    values,
    touched,
    errors,
    isSubmitting,
  } = useFormik({
    validateOnChange: true,
    initialValues: {
      first_name: "",
      last_name: "",
      gender: undefined,
      birthdate: new Date(),
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Required"),
      last_name: Yup.string().required("Required"),
      gender: Yup.object<GenderOption>().required("Required"),
      birthdate: Yup.date().required("Required"),
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (
      values: UserInitialState,
      { setSubmitting, resetForm, setErrors }
    ) => {
      setSubmitting(true);
      const authApi = new AuthApi();
      const response = await authApi.register(
        values.first_name,
        values.last_name,
        values.gender?.label,
        values.birthdate,
        values.email,
        values.password
      );
      if (response?.status === 204) {
        setRegisterCompleted(true);
        setSubmitting(false);
        resetForm();
      } else if ((response as ErrorValidationResponse)?.errors) {
        setErrors((response as ErrorValidationResponse)?.errors);
        return false;
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles.register}  shadow-lg shadow-cyan-200/70`}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-8">
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
                required={true}
              />{" "}
              <CustomDatePicker
                label="Birthdate"
                name="birthdate"
                error={errors.birthdate as string}
                touched={touched.birthdate as boolean}
                onChange={async (date) =>
                  await setFieldValue("birthdate", date)
                }
                value={values.birthdate}
              />
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
        <div className="mt-6 flex flex-col items-center justify-center gap-x-6">
          {registerCompleted && <p className="text-cyan-700 mb-2">Please Login!</p>}
          {isSubmitting ? (
            <Loader />
          ) : (
            <button
              type="submit"
              className="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
