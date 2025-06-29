"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  Search,
  Eye,
  Edit,
  Share2,
  Plus,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Bell,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { fetchUserCampaigns, fetchUserById } from "@/lib/api";
import { useUser } from "@/hooks/useUser";
import { getDaysBetweenDates } from "@/lib/utils";

export default function UserAllCampaigns() {
  //   const userId = 1 // In a real app, this would come from auth context
  const { data: userData } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");

  const { data: user } = useQuery({
    queryKey: ["user", userData?.userId],
    queryFn: () => fetchUserById(userData?.userId),
  });

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["userCampaigns", userData?.userId],
    queryFn: () => fetchUserCampaigns(),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    .filter((campaign: any) => {
      const matchesSearch = campaign.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "raised":
          return b.raisedAmount - a.raisedAmount;
        case "goal":
          return b.goalAmount - a.goalAmount;
        case "donors":
          return b.donorCount - a.donorCount;
        default:
          return 0;
      }
    });

  const totalRaised = campaigns.reduce(
    (sum: number, c: any) => sum + c.raisedAmount,
    0
  );
  const totalGoal = campaigns.reduce(
    (sum: number, c: any) => sum + c.goalAmount,
    0
  );
  const totalDonors = campaigns.reduce(
    (sum: number, c: any) => sum + c.donorCount,
    0
  );
  const activeCampaigns = campaigns.filter(
    (c: any) => c.status === "active"
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading your campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center">
                <Heart className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">
                  FundHope
                </span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">My Campaigns</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Avatar>
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {`${user?.firstname} ${user?.lastname}`
                    .split(" ")
                    .map((n: any) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Campaigns
          </h1>
          <p className="text-gray-600">
            Manage and track all your fundraising campaigns
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Raised
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalRaised)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Campaigns
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaigns.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Donors
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {(totalDonors as string) ?? 0} */}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Active Campaigns
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeCampaigns}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search your campaigns..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created">Date Created</SelectItem>
                    <SelectItem value="raised">Amount Raised</SelectItem>
                    <SelectItem value="goal">Goal Amount</SelectItem>
                    <SelectItem value="donors">Donor Count</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Campaigns Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign: any) => (
              <Card key={campaign.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={campaign.imageUrl || "/placeholder.svg"}
                    alt={campaign.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-white text-gray-800">
                    {campaign.category?.name}
                  </Badge>
                  <Badge
                    className="absolute top-4 left-4"
                    variant={
                      campaign.status === "ACCEPTED"
                        ? "default"
                        : campaign.status === "PENDING"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {campaign.status === "ACCEPTED"
                      ? "Active"
                      : campaign.status === "PENDING"
                        ? "Inactive"
                        : "Paused"}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">
                    {campaign.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">
                          {formatCurrency(campaign.currentAmount)}
                        </span>
                        <span className="text-gray-500">
                          of {formatCurrency(campaign.targetAmount)}
                        </span>
                      </div>
                      <Progress
                        value={
                          (campaign.currentAmount / campaign.targetAmount) * 100
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{campaign.donations?.length} donors</span>
                      <span>
                        {getDaysBetweenDates(campaign.deadline)} days left
                      </span>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <Link href={`/campaigns/${campaign.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery || statusFilter !== "all"
                ? "No campaigns found"
                : "No campaigns yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Start your first fundraising campaign today"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Campaign
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
