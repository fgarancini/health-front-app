import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginPage = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <RegisterForm />
        <div className="w-1 m-8 h-96 border-l-2 shadow-lg shadow-cyan-200/70"></div>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
