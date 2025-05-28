"use client";
import React from "react";
import CreateCampaignModal from "../_components/create-campaign-modal";
import CampaignsTable from "../_components/campaigns-table";

const CampaignsPage = () => {
  return (
    <div className="space-y-4">
      <CreateCampaignModal />
      <CampaignsTable />
    </div>
  );
};

export default CampaignsPage;
