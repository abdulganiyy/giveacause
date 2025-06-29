"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Shield,
  Search,
  Eye,
  MoreHorizontal,
  Play,
  Pause,
  Trash2,
  Download,
  ArrowUpDown,
  Calendar,
  DollarSign,
  Users,
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
// import { toast } from "@/hooks/use-toast"
import { toast } from "sonner";

import CampaignDetailsModal from "./campaign-details-modal";
import { fetchCampaigns, updateCampaign, deleteCampaign } from "@/lib/api";
// import type { Campaign } from "@/lib/api";

export default function AdminAllCampaigns() {
  const queryClient = useQueryClient();
  //   const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
  //     null
  //   );
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");

  const { data: campaignsData, isLoading } = useQuery({
    queryKey: ["allCampaigns"],
    queryFn: () => fetchCampaigns(),
  });

  // Mutations
  const updateCampaignStatusMutation = useMutation({
    mutationFn: ({
      campaignId,
      status,
    }: {
      campaignId: string;
      status: string;
    }) => updateCampaign(campaignId, { status }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });
      toast.success("Campaign Updated", {
        description: `Campaign has been ${variables.status === "active" ? "activated" : "deactivated"}.`,
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to update campaign status.",
      });
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: (campaignId: string) => deleteCampaign(campaignId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCampaigns"] });

      toast.message("Campaign Deleted", {
        description: "Campaign has been permanently deleted.",
      });
    },
    onError: () => {
      toast.error("Error", {
        description: "Failed to delete campaign.",
      });
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

  const handleCampaignStatusChange = (campaignId: string, status: string) => {
    updateCampaignStatusMutation.mutate({ campaignId, status });
  };

  const handleCampaignDelete = (campaignId: string) => {
    deleteCampaignMutation.mutate(campaignId);
  };

  const handleViewCampaign = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsCampaignModalOpen(true);
  };

  const campaigns = campaignsData?.data || [];

  //   console.log(campaigns);

  // Filter and sort campaigns
  const filteredCampaigns = campaigns
    ?.filter((campaign: any) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.organizer.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || campaign.status === statusFilter;
      const matchesCategory =
        categoryFilter === "all" || campaign.category === categoryFilter;
      return matchesSearch && matchesStatus && matchesCategory;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "created":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "raised":
          return b.currentAmount - a.currentAmount;
        case "goal":
          return b.targetAmount - a.targetAmount;
        case "donors":
          return b.donations?.length - a.donations?.length;
        default:
          return 0;
      }
    });

  const categories = [...new Set(campaigns.map((c: any) => c.category.name))];
  const totalRaised = campaigns.reduce(
    (sum: number, c: any) => sum + c.currentAmount,
    0
  );
  const activeCampaigns = campaigns.filter(
    (c: any) => c.status === "ACCEPTED"
  ).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading campaigns...</p>
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
              <Link href="/admin" className="flex items-center">
                <Shield className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">
                  FundHope Admin
                </span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">All Campaigns</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            All Campaigns
          </h1>
          <p className="text-gray-600">
            Manage and monitor all campaigns on the platform
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
                <Users className="h-8 w-8 text-blue-600" />
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
                <Play className="h-8 w-8 text-purple-600" />
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

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Categories
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {categories.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search campaigns or organizers..."
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
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category: any) => (
                    <SelectItem key={category?.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
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
          </CardContent>
        </Card>

        {/* Campaigns Table */}
        <Card>
          <CardHeader>
            <CardTitle>Campaigns ({filteredCampaigns.length})</CardTitle>
            <CardDescription>
              {filteredCampaigns.length === campaigns.length
                ? "Showing all campaigns"
                : `Showing ${filteredCampaigns.length} of ${campaigns.length} campaigns`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Organizer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortBy("raised")}
                    >
                      Raised <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortBy("goal")}
                    >
                      Goal <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortBy("donors")}
                    >
                      Donors <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortBy("created")}
                    >
                      Created <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign: any) => (
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
                      {formatCurrency(campaign.currentAmount)}
                    </TableCell>
                    <TableCell>
                      {formatCurrency(campaign.targetAmount)}
                    </TableCell>
                    <TableCell>{campaign._count?.donations}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          campaign.status === "active"
                            ? "default"
                            : campaign.status === "inactive"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {campaign.status === "ACCEPTED"
                          ? "Active"
                          : campaign.status === "PENDING"
                            ? "Inactive"
                            : "Rejected"}
                      </Badge>
                    </TableCell>
                    <TableCell>{campaign.createdAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewCampaign(campaign)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

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

                            {campaign.status === "active" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleCampaignStatusChange(
                                    campaign.id,
                                    "inactive"
                                  )
                                }
                                className="text-orange-600"
                              >
                                <Pause className="mr-2 h-4 w-4" />
                                Deactivate Campaign
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleCampaignStatusChange(
                                    campaign.id,
                                    "active"
                                  )
                                }
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
                                    {campaign.title}"? This action cannot be
                                    undone and will permanently remove the
                                    campaign and all associated data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleCampaignDelete(campaign.id)
                                    }
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
      </div>

      {/* Campaign Details Modal */}
      <CampaignDetailsModal
        campaign={selectedCampaign}
        isOpen={isCampaignModalOpen}
        onClose={() => {
          setIsCampaignModalOpen(false);
          setSelectedCampaign(null);
        }}
      />
    </div>
  );
}
