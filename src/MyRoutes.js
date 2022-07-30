import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Success from "./components/Success";
import Failure from "./components/Failure";
import FreeRoute from "./components/authTest/FreeRoute";
import ProtectedRoute from "./components/authTest/ProtectedRoute";
import Access from "./components/access/Access";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/success" element={<Success />} />
        <Route path="/free" element={<FreeRoute />} />
        <Route path="/protected" element={<ProtectedRoute />} />
        <Route path="/" element={<Access />} />
      </Routes>
    </>
  );
};

export default MyRoutes;
