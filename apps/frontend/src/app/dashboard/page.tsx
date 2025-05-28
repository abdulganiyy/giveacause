"use client";
import React from "react";
import UserDashboard from "./_components/user-dashboard-component";
import AdminDashboard from "./_components/admin-dashboard-component";
import { useUser } from "@/hooks/useUser";

const DashboardPage = () => {
  const { data: user } = useUser();

  console.log(user);

  return (
    <div>{user?.role === "User" ? <UserDashboard /> : <AdminDashboard />}</div>
  );
};

export default DashboardPage;
