import React from "react";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import RoleTable from "../Admin/RoleTable";

const Header = () => (
  <AppBar position="static" color="inherit" sx={{ bgcolor: "#3635358e" }}>
    <Toolbar>
      <Typography variant="h6">Admin Dashboard</Typography>
    </Toolbar>
  </AppBar>
);

const Footer = () => (
  <Box
    sx={{
      width: "100%",
      bgcolor: "#3635358e",
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

const AdminDashboard = () => {
  const handleEdit = (row) => console.log("Edit role:", row);
  const handleAdd = () => console.log("Add role");

  const currentUser = "admin@example.com"; // Logged-in user

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container sx={{ mt: 4, mb: 10 }}>
        <RoleTable onEdit={handleEdit} onAdd={handleAdd} currentUser={currentUser} />
      </Container>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;

