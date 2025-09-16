import React from "react";
import { Routes, Route } from "react-router-dom";
import MainRouter from "./MainRouter";
import Goaly from "../../views/Admin/Goaly";


const AdminRouter = () => {
  return (
    <Routes>
      {/* Admin-only pages */}
       <Route path="/Goals/admin/request" element={<Goaly />} />
      
      {/* Catch-all */}
      <Route path="*" element={<MainRouter />} />
    </Routes>
  );
};

export default AdminRouter;


