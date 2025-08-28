import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/Slice/authslice"; // adjust path

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // clears redux + storage
    navigate("/login"); // redirect to login page
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        border: "none",
        borderRadius: "6px",
        background: "#e63946",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
