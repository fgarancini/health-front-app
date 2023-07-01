import Input from "../components/Input";
import styles from "../styles/login.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {

  const navigate = useNavigate();

  const { handleChange, handleSubmit, isSubmitting, values, touched, errors } =
    useFormik({
      validateOnChange: true,
      initialValues: {
        email: "",
        password: "",
      },
      enableReinitialize: true,
      validationSchema: Yup.object({
        email: Yup.string().required("Required"),
        password: Yup.string().required("Required"),
      }),
      onSubmit: async (values, { setSubmitting }) => {
        setSubmitting(true);
        const authApi = new AuthApi();

        await authApi.login(values.email, values.password);

        if (localStorage.getItem("token")) {
          setSubmitting(false);
          navigate('/diagnosis')
        }
      },
    });
    
  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles.login} m-3 shadow-lg shadow-cyan-200/70`}>
        <div className="space-y-9">
          <div className="border-b border-gray-900/10 pb-6">
            <h2 className="text-base underline underline-offset-2 decoration-1 decoration-black-300 font-semibold leading-7 text-gray-900">
              Log in
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-2 gap-y-5 sm:grid-cols-6">
              <Input
                label="Email"
                name="email"
                type="text"
                className="sm:col-span-full"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                touched={touched.email}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                className="sm:col-span-full"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                touched={touched.password}
              />
            </div>
          </div>
          <div className="mt-3 flex items-center justify-center gap-x-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
