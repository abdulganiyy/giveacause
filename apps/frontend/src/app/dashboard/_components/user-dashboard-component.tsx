"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  Heart,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  Settings,
  Bell,
  Calendar,
  Eye,
  Edit,
  Share2,
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/useUser";
import { ProfileCompletionModal } from "./profile-completion-modal";

// import CampaignForm from "./create-campaign-modal";
import {
  fetchUserStats,
  fetchUserCampaigns,
  fetchUserDonations,
} from "@/lib/api";
import { useState } from "react";
import { getDaysBetweenDates } from "@/lib/utils";
import CreateCampaignModal from "./create-campaign-modal";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  // const userId = 1; // In a real app, this would come from auth context
  // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const router = useRouter();

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserStats,
  });

  const { data: campaignsData, isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ["userCampaigns"],
    queryFn: fetchUserCampaigns,
  });

  const { data: donationsData, isLoading: isLoadingDonations } = useQuery({
    queryKey: ["userDonations"],
    queryFn: fetchUserDonations,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Check if profile completion modal should be shown
  useEffect(() => {
    if (user && !user.profileComplete) {
      // Check if user has dismissed the reminder
      const dismissed =
        localStorage.getItem("hideProfileCompletion") === "true";

      if (!dismissed && !user.profileCompletionReminderDismissed) {
        // Show modal after a short delay to let the dashboard load
        const timer = setTimeout(() => {
          setIsProfileModalOpen(true);
        }, 1500);

        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  const handleGoToSettings = () => {
    setIsProfileModalOpen(false);
    router.push("/dashboard/settings");
  };

  // console.log(userCampaigns, userDonations);

  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-8 w-16" />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const userCampaigns = campaignsData || [];

  const userDonations = donationsData || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Heart className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">
                  FundHope
                </span>
              </Link>
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
                  {user?.name
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Here's what's happening with your campaigns and donations
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
                    {user?.totalRaised.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}{" "}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Donated
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user?.totalDonated.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
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
                  <p className="text-sm font-medium text-gray-600">Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user?.campaignsCreated || 0}
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
                    Donations Made
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {user?.donationsMade || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">My Campaigns</TabsTrigger>
            <TabsTrigger value="donations">My Donations</TabsTrigger>
            {/* <TabsTrigger value="settings">Settings</TabsTrigger> */}
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>
              {/* <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Campaign
              </Button> */}
              <CreateCampaignModal />
            </div>

            {isLoadingCampaigns ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array(2)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i}>
                      <Skeleton className="h-48 w-full" />
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-2 w-full" />
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : userCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {userCampaigns.map((campaign: any) => (
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
                              {campaign.currentAmount.toLocaleString("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
                            </span>
                            <span className="text-gray-500">
                              {campaign.targetAmount.toLocaleString("en-NG", {
                                style: "currency",
                                currency: "NGN",
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              })}
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
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Button>
                          {/* <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                          >
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </Button> */}
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
                  No campaigns yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your first fundraising campaign today
                </p>
                {/* <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Campaign
                </Button> */}
                <CreateCampaignModal />
              </Card>
            )}
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Donations</h2>

            {isLoadingDonations ? (
              <div className="space-y-4">
                {Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <Skeleton className="h-5 w-64" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                          <Skeleton className="h-6 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            ) : userDonations.length > 0 ? (
              <div className="space-y-4">
                {userDonations.map((donation: any) => (
                  <Card key={donation.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {donation.campaignTitle}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-4 w-4" />
                              {donation.date}
                            </span>
                            {donation.anonymous && (
                              <Badge variant="secondary">Anonymous</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">
                            {formatCurrency(donation.amount)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No donations yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start supporting causes you care about
                </p>
                <Link href="/campaigns">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Browse Campaigns
                  </Button>
                </Link>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Account Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Manage your payment methods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      Paystack Subaccount
                    </label>
                    <p className="text-gray-900 font-mono text-sm">
                      {user?.paystackSubaccount || "Not connected"}
                    </p>
                  </div>
                  <Button variant="outline">
                    {user?.paystackSubaccount ? "Update" : "Connect"} Paystack
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Campaign Modal */}
      {/* <CampaignForm /> */}
      {/* Profile Completion Modal */}
      {user && (
        <ProfileCompletionModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          onGoToSettings={handleGoToSettings}
          user={user}
        />
      )}
    </div>
  );
}

// "use client";
// import React from "react";
// import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import CampaignsTable from "./campaigns-table";

// import { Bar, BarChart } from "recharts";

// import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// import { useQuery } from "@tanstack/react-query";
// import apiService from "@/lib/apiService";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "#2563eb",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "#60a5fa",
//   },
// } satisfies ChartConfig;

// const fetchCampaigns = async () => {
//   const response = await apiService.get("/user/campaigns");
//   return response;
// };
// const UserDashboard = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["userCampaigns"],
//     queryFn: fetchCampaigns,
//   });

//   return (
//     <div className="space-y-4">
//       <div className="md:grid-cols-4 grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card">
//         <Card className="@container/card">
//           <CardHeader className="relative">
//             <CardDescription>Total Donated</CardDescription>
//             <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//               $1,250.00
//             </CardTitle>
//             {/* <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingUpIcon className="size-3" />
//               +12.5%
//             </Badge>
//           </div> */}
//           </CardHeader>
//           {/* <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Trending up this month <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">
//             Visitors for the last 6 months
//           </div>
//         </CardFooter> */}
//         </Card>
//         <Card className="@container/card">
//           <CardHeader className="relative">
//             <CardDescription>Total Raised</CardDescription>
//             <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//               $11,250.00
//             </CardTitle>
//             {/* <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingDownIcon className="size-3" />
//               -20%
//             </Badge>
//           </div> */}
//           </CardHeader>
//           {/* <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Down 20% this period <TrendingDownIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">
//             Acquisition needs attention
//           </div>
//         </CardFooter> */}
//         </Card>
//         <Card className="@container/card">
//           <CardHeader className="relative">
//             <CardDescription>Active Campaigns</CardDescription>
//             <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//               45,678
//             </CardTitle>
//             {/* <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingUpIcon className="size-3" />
//               +12.5%
//             </Badge>
//           </div> */}
//           </CardHeader>
//           {/* <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Strong user retention <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Engagement exceed targets</div>
//         </CardFooter> */}
//         </Card>
//         <Card className="@container/card">
//           <CardHeader className="relative">
//             <CardDescription>Pending Withdrawals</CardDescription>
//             <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
//               23,456
//             </CardTitle>
//             {/* <div className="absolute right-4 top-4">
//             <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
//               <TrendingUpIcon className="size-3" />
//               +4.5%
//             </Badge>
//           </div> */}
//           </CardHeader>
//           {/* <CardFooter className="flex-col items-start gap-1 text-sm">
//           <div className="line-clamp-1 flex gap-2 font-medium">
//             Steady performance <TrendingUpIcon className="size-4" />
//           </div>
//           <div className="text-muted-foreground">Meets growth projections</div>
//         </CardFooter> */}
//         </Card>
//       </div>
//       <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
//         <BarChart accessibilityLayer data={chartData}>
//           <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
//           <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
//         </BarChart>
//       </ChartContainer>
//       {data?.campaigns && <CampaignsTable data={data.campaigns} />}
//     </div>
//   );
// };

// export default UserDashboard;
