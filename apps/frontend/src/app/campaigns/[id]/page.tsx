"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Share2,
  Users,
  Calendar,
  DollarSign,
  MessageCircle,
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
import NavBar from "@/components/custom/NavBar";

// Mock data for the donation campaign
const campaignData = {
  title: "Help Sarah Rebuild After House Fire",
  description:
    "On December 15th, Sarah and her two young children lost everything when their home was destroyed in a devastating house fire. Thankfully, everyone escaped safely, but they now face the overwhelming task of rebuilding their lives from scratch. Sarah is a single mother who works as a nurse, dedicating her life to helping others. Now, she needs our help.",
  goalAmount: 50000,
  raisedAmount: 32750,
  donorCount: 247,
  daysLeft: 23,
  organizer: {
    name: "Michael Johnson",
    relationship: "Family Friend",
    avatar: "/placeholder-user.jpg",
  },
  //   image: "/placeholder.svg?height=400&width=600",
  image:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
};

const recentDonations = [
  {
    id: 1,
    name: "Anonymous",
    amount: 500,
    message: "Praying for your family. Stay strong! 🙏",
    time: "2 hours ago",
    avatar: null,
  },
  {
    id: 2,
    name: "Jennifer Martinez",
    amount: 100,
    message:
      "Sarah helped take care of my mom at the hospital. She's an angel.",
    time: "4 hours ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "David Chen",
    amount: 250,
    message: "Hope this helps with getting back on your feet.",
    time: "6 hours ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 4,
    name: "Lisa Thompson",
    amount: 75,
    message: "Sending love and support from our family to yours.",
    time: "8 hours ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 5,
    name: "Robert Wilson",
    amount: 200,
    message: "",
    time: "12 hours ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 6,
    name: "Anonymous",
    amount: 50,
    message: "Every little bit helps. God bless.",
    time: "1 day ago",
    avatar: null,
  },
  {
    id: 7,
    name: "Maria Garcia",
    amount: 300,
    message: "Sarah is such a caring nurse. We're here for you!",
    time: "1 day ago",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 8,
    name: "James Anderson",
    amount: 150,
    message: "Wishing you and your children all the best.",
    time: "2 days ago",
    avatar: "/placeholder-user.jpg",
  },
];

const CampaignPage = () => {
  const [showAllDonations, setShowAllDonations] = useState(false);
  const progressPercentage =
    (campaignData.raisedAmount / campaignData.goalAmount) * 100;
  const displayedDonations = showAllDonations
    ? recentDonations
    : recentDonations.slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Campaign Image */}
            <div className="relative">
              <Image
                src={campaignData.image || "./children.jpg"}
                // src={"children.jpg"}
                alt="Campaign image"
                width={600}
                height={400}
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
            </div>

            {/* Campaign Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {campaignData.title}
              </h1>
              <p className="text-gray-700 leading-relaxed">
                {campaignData.description}
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
                      src={campaignData.organizer.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {campaignData.organizer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      {campaignData.organizer.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {campaignData.organizer.relationship}
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
                        {formatCurrency(campaignData.raisedAmount)}
                      </span>
                      <span className="text-sm text-gray-500">
                        raised of {formatCurrency(campaignData.goalAmount)} goal
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-lg font-semibold">
                          {campaignData.donorCount}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">donors</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-center space-x-1">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-lg font-semibold">
                          {campaignData.daysLeft}
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
                >
                  <DollarSign className="h-4 w-4 mr-2" />
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
                  {campaignData.donorCount} people have donated
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayedDonations.map((donation, index) => (
                  <div key={donation.id}>
                    <div className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        {donation.avatar ? (
                          <AvatarImage
                            src={donation.avatar || "/placeholder.svg"}
                          />
                        ) : null}
                        <AvatarFallback className="bg-gray-200">
                          {donation.name === "Anonymous"
                            ? "?"
                            : donation.name
                                .split(" ")
                                .map((n) => n[0])
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
                ))}

                {!showAllDonations && recentDonations.length > 5 && (
                  <Button
                    variant="ghost"
                    className="w-full mt-4"
                    onClick={() => setShowAllDonations(true)}
                  >
                    See all donations ({recentDonations.length})
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignPage;
