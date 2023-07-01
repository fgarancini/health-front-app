import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import LoginPage from "../../auth/pages/LoginPage";
import DiagnosisPage from "../../diagnosis/pages/DiagnosisPage";

const NavigationRouter = () => {
  return (
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
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/diagnosis" element={<DiagnosisPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default NavigationRouter;
