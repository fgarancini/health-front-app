import { Suspense, lazy } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Loader from "./Loader";
import LogoutButton from "./LogoutButton";

const LoginPage = lazy(() => import("../../auth/pages/LoginPage"));
const DiagnosisPage = lazy(() => import("../../diagnosis/pages/DiagnosisPage"));
const UserHistory = lazy(() => import("../../diagnosis/pages/UserHistory"));

const NavigationRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <nav>
          <ul className="flex justify-between items-center rounded-md bg-slate-200 h-16 m-0 text-cyan-950">
            <div className="flex">
              <li>
                <NavLink
                  to="/diagnosis"
                  className="ml-2 rounded-md px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
                >
                  Diagnosis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/history"
                  className="rounded-md px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
                >
                  History
                </NavLink>
              </li>
            </div>
            <div className="flex items-center">
              <li>
                <NavLink
                  to="/"
                  className="rounded-md px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
                >
                  Login/Register
                </NavLink>
              </li>
              <li className="ml-2 mr-2">
                <LogoutButton />
              </li>
            </div>
          </ul>
        </nav>

        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/diagnosis" Component={DiagnosisPage} />
          <Route path="/history" Component={UserHistory} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default NavigationRouter;
