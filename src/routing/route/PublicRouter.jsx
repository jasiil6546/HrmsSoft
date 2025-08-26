// src/routing/route/PublicRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../../views/auth/Login/Login";
import Logout from "../../views/auth/Login/Logout";
import Mailverification from "../../views/auth/Registrastion/Mailverification";
import Register from "../../views/auth/Registrastion/Register";
import Forgetpass from "../../views/auth/Login/Forgetpassword";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="Forget" element={<Forgetpass />} />
      <Route path="mailverification" element={<Mailverification />} />
      <Route path="logout" element={<Logout />} />
      
    </Routes>
  );
};

export default PublicRouter;
