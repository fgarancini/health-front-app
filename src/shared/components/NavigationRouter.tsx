import { Suspense, lazy } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Loader from "./Loader";
import { AuthApi } from "../../auth/api/auth.api";
import LogoutButton from "./LogoutButton";

const LoginPage = lazy(() => import("../../auth/pages/LoginPage"));
const DiagnosisPage = lazy(() => import("../../diagnosis/pages/DiagnosisPage"));
const UserHistory = lazy(() => import("../../diagnosis/pages/UserHistory"));

const NavigationRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <nav>
          <ul className="flex sm:justify-center items-center space-x-4 rounded-md bg-slate-200 h-16 m-0 text-cyan-950">
            {[
              ["Login/Register", "/"],
              ["Diagnosis", "/diagnosis"],
              ["History", "/history"],
            ].map(([title, url]) => {
              return (
                <li>
                  <NavLink
                    to={url}
                    className="rounded-md px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
                  >
                    {title}
                  </NavLink>
                </li>
              );
            })}
            <li>
              <LogoutButton />
            </li>
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
