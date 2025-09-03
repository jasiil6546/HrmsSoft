import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/lmages/logow.png";
import backgroundImg from "../../../assets/lmages/background.jpg";
import { loginUser } from "../../../redux/Slice/authslice";
import ForgotPasswordModal from "../../Dash/Forgetpass";
import "../../../App.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openForgot, setOpenForgot] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (token && user) {
      const roleId = user.role_id;
      if (roleId === 1) navigate("/admin/dashboard");
      else if (roleId === 2) navigate("/hr/dashboard");
      else if (roleId === 3) navigate("/manager/dashboard");
      else navigate("/");
    }
  }, [token, user, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    dispatch(loginUser(formData))
      .unwrap()
      .then((res) => {
        alert(`Welcome ${res.user.name || formData.email}`);

        // ✅ Save token properly
        if (rememberMe) {
          localStorage.setItem("token", res.token);
        } else {
          sessionStorage.setItem("token", res.token);
        }
      })
      .catch((err) => alert(err));
  };

  const handleForgotPassword = () => {
    alert("Send OTP to " + formData.email);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(2px)",
          opacity: 0.9,
          zIndex: 0,
        },
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        src={Logo}
        alt="Logo"
        sx={{
          position: "absolute",
          top: -35,
          left: 30,
          zIndex: 10,
          width: { xs: 60, sm: 100, md: 150, lg: 200 },
        }}
      />

      {/* Login Form */}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 4,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(25px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          zIndex: 1,
          mt: 11,
          position: "relative",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
            mb: 1,
            textShadow: "0 0 8px rgba(0,0,0,0.6)",
          }}
        >
          Sign In
        </Typography>

        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
        />

        <TextField
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          InputProps={{
            style: { color: "#fff" },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ color: "#fff" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                sx={{ color: "#fff" }}
              />
            }
            label="Remember me"
            sx={{ color: "#fff" }}
          />

          <Link
            component="button"
            underline="hover"
            sx={{ color: "#90caf9", cursor: "pointer" }}
            onClick={() => setOpenForgot(true)}
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#000",
            borderRadius: 3,
            background:
              "linear-gradient(90deg, rgba(194,166,223,1) 0%, rgba(229,238,255,1) 100%)",
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
              color: "#fff",
            },
          }}
        >
          Sign In
        </Button>

        {error && <Typography color="red">{error}</Typography>}

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center", color: "#ccc" }}
        >
          Don’t have an account?{" "}
          <Link
            href="/auth/register"
            underline="hover"
            sx={{ color: "#90caf9" }}
          >
            Get started
          </Link>
        </Typography>
      </Box>


      <ForgotPasswordModal
        open={openForgot}
        onClose={() => setOpenForgot(false)}
        email={formData.email}
        setEmail={(val) => setFormData({ ...formData, email: val })}
        loading={loading}
        error={error}
        message={"We sent an OTP to your email"}
        handleForgotPassword={handleForgotPassword}
      />
    </Box>
  );
};

export default Login;


