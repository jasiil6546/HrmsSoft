import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button, Typography } from "@mui/material";
import Logo from "../../../assets/lmages/logow.png";
import backgroundImg from "../../../assets/lmages/background.jpg";
import { registerUser } from "../../../redux/Slice/authslice";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    dispatch(registerUser({ name: formData.name, email: formData.email, password: formData.password }))
      .unwrap()
      .then((res) => {
        alert(res.message || "User created successfully");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      })
      .catch((err) => alert(err));
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
        "&::before": { content: '""', position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.82)", backdropFilter: "blur(2px)", opacity: 0.9, zIndex: 0 },
      }}
    >
      <Box component="img" src={Logo} alt="Logo" sx={{ position: "absolute", top: -35, left: 30, zIndex: 10, width: { xs: 60, sm: 100, md: 150, lg: 200 } }} />

      <Box
        component="form"
        onSubmit={handleRegister}
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
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold", color: "#fff", mb: 1, textShadow: "0 0 8px rgba(0,0,0,0.6)" }}>
          Register
        </Typography>

        {["name", "email", "password", "confirmPassword"].map((field) => (
          <TextField
            key={field}
            name={field}
            label={field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
            type={field.includes("password") ? "password" : "text"}
            value={formData[field]}
            onChange={handleChange}
            fullWidth
            InputProps={{ style: { color: "#fff" } }}
            InputLabelProps={{ style: { color: "rgba(255,255,255,0.7)" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                "& fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                "&:hover fieldset": { borderColor: "#2575fc" },
              },
            }}
          />
        ))}

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 2,
            py: 1.5,
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#000",
            borderRadius: 3,
            background: "linear-gradient(90deg, rgba(194,166,223,1) 0%, rgba(229,238,255,1) 100%)",
            "&:hover": { background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)", color: "#fff" },
          }}
        >
          Sign Up
        </Button>

        {error && <Typography color="red">{error}</Typography>}
      </Box>
    </Box>
  );
};

export default Register;
