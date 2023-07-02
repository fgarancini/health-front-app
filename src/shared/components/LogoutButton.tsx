import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../auth/api/auth.api";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const authApi = new AuthApi();
    const response = await authApi.logout();

    if (response && response?.status === 200) {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-md px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
