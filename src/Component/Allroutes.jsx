import React from "react";
import { Route, Routes } from "react-router";
import { Signup } from "./Pages/AuthPages/Signup";
import { Login } from "./Pages/AuthPages/Login";
import { Dashboard } from "./Pages/User/Dashboard";
import { Admin } from "./Pages/Admin/admin.form";
import { Joblist } from "./Pages/Admin/admin.Joblist";
import Home from "./Pages/Home";
import { Apply } from "./Pages/User/Apply";
import { AdminDash } from "./Pages/Admin/admin.dashboard";
export const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/list" element={<Joblist />}></Route>
        <Route path="/apply" element={<Apply />}></Route>
        <Route path="/student_list" element={<AdminDash />}></Route>
      </Routes>
    </div>
  );
};
