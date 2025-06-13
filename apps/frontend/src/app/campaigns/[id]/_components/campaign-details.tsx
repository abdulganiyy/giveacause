"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Share2,
  Users,
  Calendar,
  DollarSign,
  MessageCircle,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getDaysBetweenDates } from "@/lib/utils";
import DonationModal from "../_components/donation-modal";

interface CampaignDetailProps {
  campaign: any;
  isLoadingCampaign: boolean;
  donations: any[];
  isLoadingDonations: boolean;
  donationsError: Error | null;
}

export default function CampaignDetail({
  campaign,
  isLoadingCampaign,
  donations,
  isLoadingDonations,
  donationsError,
}: CampaignDetailProps) {
  const [showAllDonations, setShowAllDonations] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const displayedDonations = showAllDonations
    ? donations
    : donations?.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Heart className="h-8 w-8 text-green-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">FundHope</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/campaigns">
                <Button variant="ghost" size="sm">
                  All Campaigns
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoadingCampaign ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="w-full h-64 sm:h-80 rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-24" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-24 mt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-2 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <Skeleton className="h-6 w-16 mx-auto" />
                        <Skeleton className="h-4 w-12 mx-auto mt-1" />
                      </div>
                      <div className="text-center">
                        <Skeleton className="h-6 w-16 mx-auto" />
                        <Skeleton className="h-4 w-12 mx-auto mt-1" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i}>
                        <div className="flex items-start space-x-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-5 w-16" />
                            </div>
                            <Skeleton className="h-3 w-full mt-1" />
                            <Skeleton className="h-3 w-16 mt-1" />
                          </div>
                        </div>
                        {i < 2 && <Separator className="mt-4" />}
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          campaign && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Campaign Image */}
                <div className="relative">
                  <Image
                    src={campaign.imageUrl || "/placeholder.svg"}
                    alt="Campaign image"
                    width={600}
                    height={400}
                    className="w-full h-64 sm:h-80 object-cover rounded-lg"
                  />
                  <Badge className="absolute top-4 right-4 bg-white text-gray-800">
                    {campaign.category}
                  </Badge>
                </div>

                {/* Campaign Title and Description */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {campaign.title}
                  </h1>
                  <p className="text-gray-700 leading-relaxed">
                    {campaign.fullDescription || campaign.description}
                  </p>
                </div>

                {/* Organizer Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src={
                            campaign?.creator?.avatarUrl || "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {campaign?.creator?.firstname
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {campaign?.creator?.firstname}
                        </p>
                        <p className="text-sm text-gray-500">
                          {campaign?.creator?.relationship}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Donation Card */}
                <Card className="sticky top-4">
                  <CardHeader>
                    <div className="space-y-4">
                      {/* Progress */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {formatCurrency(campaign.currentAmount)}
                          </span>
                          <span className="text-sm text-gray-500">
                            raised of {formatCurrency(campaign.targetAmount)}{" "}
                            goal
                          </span>
                        </div>
                        <Progress
                          value={
                            (campaign.currentAmount / campaign.targetAmount) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-lg font-semibold">
                              {donations.length || 0}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">donors</p>
                        </div>
                        <div>
                          <div className="flex items-center justify-center space-x-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-lg font-semibold">
                              {getDaysBetweenDates(campaign.deadline)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">days left</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                      onClick={() => setIsDonationModalOpen(true)}
                    >
                      {/* <DollarSign className="h-4 w-4 mr-2" /> */}
                      <span className="inline-block text-lg mr-2">₦</span>
                      Donate Now
                    </Button>
                    <Button variant="outline" className="w-full" size="lg">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Donations */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span>Recent Donations</span>
                    </CardTitle>
                    <CardDescription>
                      {campaign.donations.length || 0} people have donated
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingDonations ? (
                      <div className="space-y-4">
                        {Array(3)
                          .fill(0)
                          .map((_, i) => (
                            <div key={i}>
                              <div className="flex items-start space-x-3">
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <Skeleton className="h-4 w-24" />
                                    <Skeleton className="h-5 w-16" />
                                  </div>
                                  <Skeleton className="h-3 w-full mt-1" />
                                  <Skeleton className="h-3 w-16 mt-1" />
                                </div>
                              </div>
                              {i < 2 && <Separator className="mt-4" />}
                            </div>
                          ))}
                      </div>
                    ) : donationsError ? (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                          Failed to load donations. Please try again later.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <div className="space-y-4">
                        {displayedDonations.map(
                          (donation: any, index: number) => (
                            <div key={donation.id}>
                              <div className="flex items-start space-x-3">
                                <Avatar className="h-8 w-8">
                                  {donation.avatar ? (
                                    <AvatarImage
                                      src={
                                        donation.avatar || "/placeholder.svg"
                                      }
                                    />
                                  ) : null}
                                  <AvatarFallback className="bg-gray-200">
                                    {donation.name === "Anonymous"
                                      ? "?"
                                      : donation.name
                                          .split(" ")
                                          .map((n: string) => n[0])
                                          .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                      {donation.name}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                      <Badge
                                        variant="secondary"
                                        className="bg-green-100 text-green-800"
                                      >
                                        {formatCurrency(donation.amount)}
                                      </Badge>
                                    </div>
                                  </div>
                                  {donation.message && (
                                    <div className="mt-1 flex items-start space-x-1">
                                      <MessageCircle className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                                      <p className="text-xs text-gray-600 leading-relaxed">
                                        {donation.message}
                                      </p>
                                    </div>
                                  )}
                                  <p className="text-xs text-gray-500 mt-1">
                                    {donation.time}
                                  </p>
                                </div>
                              </div>
                              {index < displayedDonations.length - 1 && (
                                <Separator className="mt-4" />
                              )}
                            </div>
                          )
                        )}

                        {!showAllDonations && donations.length > 5 && (
                          <Button
                            variant="ghost"
                            className="w-full mt-4"
                            onClick={() => setShowAllDonations(true)}
                          >
                            See all donations ({donations.length})
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )
        )}
      </div>
      {/* Donation Modal */}
      {campaign && (
        <DonationModal
          isOpen={isDonationModalOpen}
          onClose={() => setIsDonationModalOpen(false)}
          campaignId={campaign.id}
          campaignTitle={campaign.title}
        />
      )}
    </div>
  );
}
