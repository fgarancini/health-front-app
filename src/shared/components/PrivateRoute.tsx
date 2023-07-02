import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ children }: { children: () => JSX.Element }) => {
  const isAuth = localStorage.getItem("token") !== "";

  return !isAuth ? <Navigate to={"/"} replace /> : children ? children() : <Outlet />;
};

export default PrivateRoute;