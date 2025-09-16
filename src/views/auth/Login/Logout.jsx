import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Refresh page
    window.location.reload();
  }, []);

  return null;
};

export default Logout;
