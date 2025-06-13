"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaignById, fetchDonationsByCampaignId } from "@/lib/api";
import CampaignDetail from "./_components/campaign-details";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CampaignPage() {
  const params = useParams();
  const campaignId = params?.id;

  // console.log(params, campaignId);

  // Fetch campaign data
  const {
    data: campaign,
    isLoading: isLoadingCampaign,
    error: campaignError,
  } = useQuery({
    queryKey: ["campaign", campaignId],
    queryFn: () => fetchCampaignById(campaignId),
    retry: 1,
  });

  // Fetch donations
  // const {
  //   data: donations = [],
  //   isLoading: isLoadingDonations,
  //   error: donationsError,
  // } = useQuery({
  //   queryKey: ["donations", campaignId],
  //   queryFn: () => fetchDonationsByCampaignId(campaignId),
  //   enabled: !!campaign, // Only fetch donations if campaign exists
  // });

  console.log(campaign);

  if (campaignError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load campaign details. Please try again later or contact
            support.
          </AlertDescription>
          <div className="mt-4">
            <Link href="/campaigns">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Campaigns
              </Button>
            </Link>
          </div>
        </Alert>
      </div>
    );
  }

  return (
    <CampaignDetail
      campaign={campaign}
      isLoadingCampaign={isLoadingCampaign}
      donations={campaign?.donations}
      isLoadingDonations={isLoadingCampaign}
      donationsError={campaignError}
      //   isLoadingDonations={isLoadingDonations}
      // donationsError={donationsError}
    />
  );
}
