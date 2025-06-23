"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Shield,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
  Eye,
  XCircle,
  BarChart3,
  MoreHorizontal,
  Play,
  Pause,
  Trash2,
  UserCheck,
  UserX,
  Ban,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import {
  fetchAdminStats,
  updateCampaign,
  deleteCampaign,
  updateUser,
  deleteUser,
} from "@/lib/api";
import { getDaysBetweenDates } from "@/lib/utils";
import UserDetailsModal from "./user-details-modal";
import CampaignDetailsModal from "./campaign-details-modal";

export default function AdminDashboard() {
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: adminStats, isLoading } = useQuery({
    queryKey: ["adminStats"],
    queryFn: fetchAdminStats,
  });

  // Campaign mutations
  const updateCampaignMutation = useMutation({
    mutationFn: ({ campaignId, data }: { campaignId: string; data: any }) =>
      updateCampaign(campaignId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      // toast(`Campaign has been ${variables.status === "active" ? "activated" : "deactivated"}.`);
      toast(`Campaign has been updated.`);
    },
    onError: () => {
      toast.error("Failed to update campaign status.");
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: (campaignId: string) => deleteCampaign(campaignId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      toast("Campaign has been permanently deleted.");
    },
    onError: () => {
      toast.error("Failed to delete campaign.");
    },
  });

  // User mutations
  const updateUserMutation = useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: any }) =>
      updateUser(userId, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      // toast( `User has been ${variables.status === "active" ? "activated" : "deactivated"}.`,);
      toast(`User has been updated`);
    },
    onError: () => {
      toast.error("Failed to update user.");
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      toast("User account has been permanently deleted.");
    },
    onError: () => {
      toast.error("Failed to delete user.");
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // console.log(adminStats);
  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsCampaignModalOpen(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading admin dashboard...</p>
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
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-green-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">
                GiveACause Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  View Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage the FundHope platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {adminStats?.totalUsers.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Campaigns
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {adminStats?.totalCampaigns.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Total Raised
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {formatCurrency(adminStats?.totalRaised || 0)} */}
                    {adminStats?.totalRaised.toLocaleString("en-NG", {
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
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Platform Revenue
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {/* {formatCurrency(adminStats?.platformRevenue || 0)} */}
                    {adminStats?.platformRevenue.toLocaleString("en-NG", {
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
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-orange-800">
                    Pending Campaigns
                  </p>
                  <p className="text-xl font-bold text-orange-900">
                    {adminStats?.pendingCampaigns} campaigns awaiting review
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="h-6 w-6 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-red-800">
                    Flagged Campaigns
                  </p>
                  <p className="text-xl font-bold text-red-900">
                    {adminStats?.flaggedCampaigns} campaigns need attention
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Campaign Management
              </h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Campaigns</CardTitle>
                <CardDescription>
                  Campaigns with the highest funding amounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Organizer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Raised</TableHead>
                      <TableHead>Goal</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminStats?.topCampaigns
                      .slice(0, 5)
                      .map((campaign: any) => (
                        <TableRow key={campaign.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Image
                                src={campaign.imageUrl || "/placeholder.svg"}
                                alt={campaign.title}
                                width={40}
                                height={40}
                                className="rounded object-cover"
                              />
                              <div>
                                <p className="font-medium line-clamp-1">
                                  {campaign.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  ID: {campaign.id}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {campaign.creator?.firstname +
                              " " +
                              campaign.creator?.lastname}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {campaign.category?.name}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {/* {formatCurrency(campaign.raisedAmount)} */}
                            {campaign.raisedAmount.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell>
                            {/* {formatCurrency(campaign.goalAmount)} */}
                            {campaign.goalAmount.toLocaleString("en-NG", {
                              style: "currency",
                              currency: "NGN",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                campaign.isActive ? "default" : "secondary"
                                // getDaysBetweenDates(campaign.deadline) > 0
                                //   ? "default"
                                //   : "secondary"
                              }
                            >
                              {/* {getDaysBetweenDates(campaign.deadline) > 0
                                ? "Active"
                                : "Ended"} */}
                              {campaign.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewCampaign(campaign)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {/* <Button variant="outline" size="sm">
                                <Ban className="h-4 w-4" />
                              </Button> */}

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>
                                    Campaign Actions
                                  </DropdownMenuLabel>
                                  <DropdownMenuSeparator />

                                  {campaign.isActive ? (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        updateCampaignMutation.mutate({
                                          campaignId: campaign.id,
                                          data: {
                                            isActive: false,
                                            status: "PENDING",
                                          },
                                        });
                                      }}
                                      className="text-orange-600"
                                    >
                                      <Pause className="mr-2 h-4 w-4" />
                                      Deactivate Campaign
                                    </DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        updateCampaignMutation.mutate({
                                          campaignId: campaign.id,
                                          data: {
                                            isActive: true,
                                            status: "ACCEPTED",
                                          },
                                        });
                                      }}
                                      className="text-green-600"
                                    >
                                      <Play className="mr-2 h-4 w-4" />
                                      Activate Campaign
                                    </DropdownMenuItem>
                                  )}

                                  <DropdownMenuSeparator />

                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <DropdownMenuItem
                                        onSelect={(e) => e.preventDefault()}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Delete Campaign
                                      </DropdownMenuItem>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Delete Campaign
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Are you sure you want to delete "
                                          {campaign.title}"? This action cannot
                                          be undone and will permanently remove
                                          the campaign and all associated data.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                          onClick={() => {
                                            // deleteCampaignMutation.mutate(
                                            //   campaign.id
                                            // );
                                          }}
                                          className="bg-red-600 hover:bg-red-700"
                                        >
                                          Delete Campaign
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                User Management
              </h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>
                  Newly registered users on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Campaigns</TableHead>
                      <TableHead>Total Raised</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminStats?.recentUsers.map((user: any) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {user.name
                                  .split(" ")
                                  .map((n: any) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-500">
                                ID: {user.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.createdAt}</TableCell>
                        <TableCell>{user.campaignsCreated}</TableCell>
                        <TableCell>
                          {/* {formatCurrency(user.totalRaised)} */}
                          {user.totalRaised.toLocaleString("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                          })}
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{user?.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {/* <Button variant="outline" size="sm">
                              <Ban className="h-4 w-4" />
                            </Button> */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  User Actions
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {user.status === "COMPLETED" ? (
                                  <DropdownMenuItem
                                    // onClick={() => handleUserStatusChange(user.id, "inactive")}
                                    onClick={() => {
                                      updateUserMutation.mutate({
                                        userId: user.id,
                                        data: { status: "PENDING" },
                                      });
                                    }}
                                    className="text-orange-600"
                                  >
                                    <UserX className="mr-2 h-4 w-4" />
                                    Deactivate User
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    // onClick={() => handleUserStatusChange(user.id, "active")}
                                    onClick={() => {
                                      updateUserMutation.mutate({
                                        userId: user.id,
                                        data: { status: "COMPLETED" },
                                      });
                                    }}
                                    className="text-green-600"
                                  >
                                    <UserCheck className="mr-2 h-4 w-4" />
                                    Activate User
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuSeparator />

                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <DropdownMenuItem
                                      onSelect={(e) => e.preventDefault()}
                                      className="text-red-600"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete User
                                    </DropdownMenuItem>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>
                                        Delete User Account
                                      </AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to delete{" "}
                                        {user.firstname}'s account? This action
                                        cannot be undone and will permanently
                                        remove the user and all associated data
                                        including campaigns and donations.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>
                                        Cancel
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => {
                                          // deleteUserMutation.mutate(user.id)
                                        }}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete User
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Platform Analytics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Platform revenue sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Platform Tips</span>
                      <span>{formatCurrency(35000)}</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Transaction Fees</span>
                      <span>{formatCurrency(10000)}</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Campaign Categories</CardTitle>
                  <CardDescription>
                    Distribution of campaign types
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Medical</span>
                      <span>324 campaigns</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Emergency</span>
                      <span>189 campaigns</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Education</span>
                      <span>156 campaigns</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Community</span>
                      <span>203 campaigns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CampaignDetailsModal
        campaign={selectedCampaign}
        isOpen={isCampaignModalOpen}
        onClose={() => {
          setIsCampaignModalOpen(false);
          setSelectedCampaign(null);
        }}
      />

      <UserDetailsModal
        user={selectedUser}
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
          setSelectedUser(null);
        }}
      />
    </div>
  );
}
