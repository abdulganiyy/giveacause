"use client";
import React from "react";

import UserAllDonations from "../_components/user-all-donations";
import AdminAllDonations from "../_components/admin-all-donations";
import { useUser } from "@/hooks/useUser";

const DonationsPage = () => {
  const { data } = useUser();
  return (
    <div>
      {data?.role == "Administrator" ? (
        <AdminAllDonations />
      ) : (
        <UserAllDonations />
      )}
    </div>
  );
};

export default DonationsPage;
