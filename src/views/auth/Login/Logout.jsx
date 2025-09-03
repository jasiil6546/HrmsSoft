import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Remove tokens on logout
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // (Optional) clear Redux state if you have logout action
    // dispatch(logoutUser());

    // Redirect to login page
    navigate("/auth/login");
  }, [navigate]);

  return null; // nothing visible
};

export default Logout;

