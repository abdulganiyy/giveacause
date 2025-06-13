"use client";
import React from "react";
import CreateCampaignModal from "../_components/create-campaign-modal";
import CampaignsTable from "../_components/campaigns-table";

import { useQuery } from "@tanstack/react-query";
import apiService from "@/lib/apiService";
import axios from "axios";

const fetchCampaigns = async () => {
  const response = await apiService.get("/user/campaigns");
  return response;
};

const CampaignsPage = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userCampaigns"],
    queryFn: fetchCampaigns,
  });

  return (
    <div className="space-y-4">
      <CreateCampaignModal />
      {data?.campaigns && <CampaignsTable data={data.campaigns} />}
    </div>
  );
};

export default CampaignsPage;
