"use client";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Shield,
  Search,
  Download,
  Calendar,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpDown,
  Eye,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { fetchAllDonations } from "@/lib/api";

export default function AdminAllDonations() {
  const [searchQuery, setSearchQuery] = useState("");
  const [campaignFilter, setCampaignFilter] = useState("all");
  const [amountFilter, setAmountFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const { data: donationsData, isLoading } = useQuery({
    queryKey: ["allDonations"],
    queryFn: fetchAllDonations,
  });

  const donations = donationsData || [];

  console.log(donations);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Filter and sort donations
  const filteredDonations = donations
    .filter((donation: any) => {
      const matchesSearch =
        donation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.campaignTitle
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesCampaign =
        campaignFilter === "all" ||
        donation.campaignId.toString() === campaignFilter;
      const matchesAmount =
        amountFilter === "all" ||
        (amountFilter === "small" && donation.amount < 100) ||
        (amountFilter === "medium" &&
          donation.amount >= 100 &&
          donation.amount < 500) ||
        (amountFilter === "large" && donation.amount >= 500);
      return matchesSearch && matchesCampaign && matchesAmount;
    })
    .sort((a: any, b: any) => {
      switch (sortBy) {
        case "date":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "amount":
          return b.amount - a.amount;
        case "campaign":
          return a.campaignTitle.localeCompare(b.campaignTitle);
        case "donor":
          return a.donorName.localeCompare(b.donorName);
        default:
          return 0;
      }
    });

  const totalDonations = donations.reduce(
    (sum: number, d: any) => sum + d.amount,
    0
  );
  const averageDonation =
    donations.length > 0 ? totalDonations / donations.length : 0;
  const uniqueCampaigns = new Set(donations.map((d: any) => d.campaignId)).size;
  const uniqueDonors = new Set(donations.map((d: any) => d.donorEmail)).size;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p>Loading donations...</p>
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
                <Shield className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-xl font-bold text-gray-900">
                  GiveACause Admin
                </span>
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">All Donations</span>
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
            All Donations
          </h1>
          <p className="text-gray-600">
            Monitor all donations across the platform
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
                    Total Donations
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(totalDonations)}
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
                    Total Count
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {donations.length}
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
                    Unique Donors
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {uniqueDonors}
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
                    Average Donation
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(averageDonation)}
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
                    placeholder="Search donors or campaigns..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={amountFilter} onValueChange={setAmountFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Amounts</SelectItem>
                  <SelectItem value="small">Under $100</SelectItem>
                  <SelectItem value="medium">$100 - $500</SelectItem>
                  <SelectItem value="large">Over $500</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="campaign">Campaign</SelectItem>
                  <SelectItem value="donor">Donor Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Donations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Donations ({filteredDonations.length})</CardTitle>
            <CardDescription>
              {filteredDonations.length === donations.length
                ? "Showing all donations"
                : `Showing ${filteredDonations.length} of ${donations.length} donations`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donor</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortBy("amount")}
                    >
                      Amount <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Platform Tip</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSortBy("date")}
                    >
                      Date <ArrowUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation: any) => (
                  <TableRow key={donation.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage
                            src={donation.donorAvatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {donation.anonymous
                              ? "A"
                              : donation.name
                                  .split(" ")
                                  .map((n: any) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {donation.anonymous ? "Anonymous" : donation.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {donation.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium line-clamp-1">
                          {donation.campaignTitle}
                        </p>
                        <p className="text-sm text-gray-500">
                          ID: {donation.campaignId}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(donation.amount)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {donation.platformTip > 0 ? (
                        <span className="text-blue-600">
                          {formatCurrency(donation.platformTip)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {donation.message ? (
                        <p className="text-sm line-clamp-2 max-w-xs">
                          {donation.message}
                        </p>
                      ) : (
                        <span className="text-gray-400">No message</span>
                      )}
                    </TableCell>
                    <TableCell>{donation.createdAt}</TableCell>
                    <TableCell>
                      <Badge variant="default">Completed</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
