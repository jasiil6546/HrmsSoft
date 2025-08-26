// src/components/AdminDashboard.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Admin Dashboard</Typography>
    </Toolbar>
  </AppBar>
);

const Footer = () => (
  <Box
    sx={{
      width: "100%",
      bgcolor: "primary.main",
      color: "white",
      textAlign: "center",
      p: 2,
      position: "fixed",
      bottom: 0,
    }}
  >
    <Typography variant="body1">© 2025 My Company</Typography>
  </Box>
);

const Body = () => (
  <Container sx={{ mt: 4, mb: 10 }}>
 
  </Container>
);

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Body />
      <Footer />
    </Box>
  );
};

export default AdminDashboard;
