import React from "react";
import { Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import Failure from "./components/Failure";
import FreeRoute from "./components/authTest/FreeRoute";
import ProtectedRoute from "./components/authTest/ProtectedRoute";

import Home from "./routes/home/Home";
import Access from "./routes/auth/Access";
import Follow from "./routes/follow/Follow";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Access />} />
        <Route path="/home" element={<Home />} />
        <Route path="/follow" element={<Follow />} />
        <Route path="/failure" element={<Failure />} />
        <Route path="/success" element={<Success />} />
        <Route path="/free" element={<FreeRoute />} />
        <Route path="/protected" element={<ProtectedRoute />} />
      </Routes>
    </>
  );
};

export default MyRoutes;
