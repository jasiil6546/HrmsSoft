import React from "react";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";

const AuthButton = ({ action, size = "medium", children, disabled, type = "login", sx }) => {
  // Choose color and icon based on type
  const isLogin = type === "login";
  const bgColor = isLogin ? "#1976d2" : "#C03530"; // blue for login, red for logout
  const color = "#fff";
  const iconName = isLogin
    ? "material-symbols:login-rounded"
    : "material-symbols:logout-rounded";

  return (
    <Button
      sx={{ ...sx, backgroundColor: bgColor, color: color }}
      onClick={action}
      disabled={disabled}
      size={size}
      variant="contained"
    >
      <Icon icon={iconName} width="25" height="25" style={{ marginRight: 8 }} />
      {children}
    </Button>
  );
};

export default AuthButton;
