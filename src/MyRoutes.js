import React from "react";
import { Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import Failure from "./components/Failure";
import FreeRoute from "./components/authTest/FreeRoute";
import ProtectedRoute from "./components/authTest/ProtectedRoute";
import Access from "./components/access/Access";
import Home from "./components/Home";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Access />} />
        <Route path="/home" element={<Home />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/success" element={<Success />} />
        <Route path="/free" element={<FreeRoute />} />
        <Route path="/protected" element={<ProtectedRoute />} />
      </Routes>
    </>
  );
};

export default MyRoutes;
