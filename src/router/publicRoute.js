import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../view/login";

export default function PublicRoute() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
