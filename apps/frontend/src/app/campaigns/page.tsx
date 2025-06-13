"use client";

import React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  Heart,
  Users,
  Calendar,
  ChevronDown,
  TrendingUp,
  Award,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  fetchCampaigns,
  fetchCategories,
  fetchFeaturedCampaigns,
  fetchTrendingCampaigns,
} from "@/lib/api";

import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";
import { getDaysBetweenDates } from "@/lib/utils";

const categories = [
  "All Categories",
  "Emergency",
  "Medical",
  "Community",
  "Animals",
  "Education",
  "Environment",
  "Housing",
];

export default function CampaignsListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset pagination when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, selectedCategory]);

  // Fetch all campaigns with search, filter, and pagination
  const {
    data: campaignsData,
    isLoading: isLoadingCampaigns,
    error: campaignsError,
    refetch: refetchCampaigns,
  } = useQuery({
    queryKey: [
      "campaigns",
      debouncedSearchQuery,
      selectedCategory,
      currentPage,
      sortBy,
    ],
    queryFn: () =>
      fetchCampaigns(
        debouncedSearchQuery,
        selectedCategory,
        currentPage,
        sortBy
      ),
  });

  // Fetch featured campaigns
  const {
    data: featuredCampaignsData = [],
    isLoading: isLoadingFeatured,
    error: featuredError,
  } = useQuery({
    queryKey: ["featuredCampaigns"],
    queryFn: fetchFeaturedCampaigns,
  });

  // Fetch trending campaigns
  const {
    data: trendingCampaignsData = [],
    isLoading: isLoadingTrending,
    error: trendingError,
  } = useQuery({
    queryKey: ["trendingCampaigns"],
    queryFn: fetchTrendingCampaigns,
  });

  // Fetch categories
  const {
    data: categories = [],
    isLoading: isLoadingCategory,
    error: categoryError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Extract campaigns and pagination from the API response
  const campaigns = campaignsData?.data || [];
  const pagination = campaignsData?.pagination || { page: 1, totalPages: 1 };

  const trendingCampaigns = trendingCampaignsData?.data || [];

  const featuredCampaigns = featuredCampaignsData?.data || [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (raised: number, goal: number) => {
    return (raised / goal) * 100;
  };

  const renderCampaignCard = (campaign: any) => {
    return (
      <Link
        href={`/campaigns/${campaign.id}`}
        key={campaign.id}
        className="block transition-transform hover:scale-[1.02]"
      >
        <Card className="h-full overflow-hidden">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={campaign.imageUrl || "/placeholder.svg"}
              alt={campaign.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
            <Badge className="absolute top-2 right-2 bg-white text-gray-800">
              {campaign.category}
            </Badge>
          </div>
          <CardHeader className="pb-2">
            <h3 className="font-bold text-lg line-clamp-1">{campaign.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {campaign.description}
            </p>
          </CardHeader>
          <CardContent className="pb-2">
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
                  value={calculateProgress(
                    campaign.raisedAmount,
                    campaign.goalAmount
                  )}
                  className="h-1.5"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex justify-between w-full text-xs text-gray-500">
              <div className="flex items-center">
                <Users className="h-3 w-3 mr-1" />
                <span>{campaign.donorCount} donors</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span>{getDaysBetweenDates(campaign.deadline)} days left</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
    );
  };

  const renderSkeletonCard = () => {
    return (
      <Card className="h-full overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3 mt-1" />
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-1.5 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex justify-between w-full">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-20" />
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NavBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900">
              Discover Campaigns
            </h1>
            <p className="text-xl text-gray-600">
              Find causes that matter to you and make a difference with your
              support
            </p>
          </div>
        </section>

        {/* Featured Campaigns */}
        {featuredCampaigns.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center mb-6">
              <Award className="h-5 w-5 text-yellow-500 mr-2" />
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Campaigns
              </h2>
            </div>
            {featuredError ? (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Failed to load featured campaigns. Please try again later.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoadingFeatured
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div key={`featured-skeleton-${i}`}>
                          {renderSkeletonCard()}
                        </div>
                      ))
                  : featuredCampaigns.map(renderCampaignCard)}
              </div>
            )}
          </section>
        )}

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search campaigns..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    {selectedCategory}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories.map((category: any) => (
                    <DropdownMenuItem
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    Sort by: {sortBy}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSortBy("Most Recent")}>
                    Most Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("Most Funded")}>
                    Most Funded
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("Ending Soon")}>
                    Ending Soon
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </section>

        {/* Tabs for different views */}
        <section className="mb-8">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {campaignsError ? (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Failed to load campaigns. Please try again later.
                  </AlertDescription>
                </Alert>
              ) : isLoadingCampaigns ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array(8)
                    .fill(0)
                    .map((_, i) => (
                      <div key={`all-skeleton-${i}`}>
                        {renderSkeletonCard()}
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {campaigns.map(renderCampaignCard)}
                  </div>
                  {campaigns.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        No campaigns found matching your criteria.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("All Categories");
                          refetchCampaigns();
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
            <TabsContent value="trending">
              {trendingError ? (
                <Alert variant="destructive" className="mb-6">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Failed to load trending campaigns. Please try again later.
                  </AlertDescription>
                </Alert>
              ) : isLoadingTrending ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={`trending-skeleton-${i}`}>
                        {renderSkeletonCard()}
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {trendingCampaigns.map(renderCampaignCard)}
                  </div>
                  {trendingCampaigns.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        No trending campaigns at the moment.
                      </p>
                    </div>
                  )}
                </>
              )}
            </TabsContent>
          </Tabs>
        </section>

        {/* Pagination */}
        {!isLoadingCampaigns && pagination.totalPages > 1 && (
          <section className="flex justify-center mt-12">
            <Button
              variant="outline"
              className="mx-1"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show first page, last page, and pages around current page
                return (
                  page === 1 ||
                  page === pagination.totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                );
              })
              .map((page, index, array) => {
                // Add ellipsis between non-consecutive pages
                if (index > 0 && page - array[index - 1] > 1) {
                  return (
                    <React.Fragment key={`ellipsis-${page}`}>
                      <Button variant="outline" className="mx-1" disabled>
                        ...
                      </Button>
                      <Button
                        variant="outline"
                        className={`mx-1 ${currentPage === page ? "bg-green-50" : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    </React.Fragment>
                  );
                }
                return (
                  <Button
                    key={page}
                    variant="outline"
                    className={`mx-1 ${currentPage === page ? "bg-green-50" : ""}`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}
            <Button
              variant="outline"
              className="mx-1"
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, pagination.totalPages)
                )
              }
              disabled={currentPage === pagination.totalPages}
            >
              Next
            </Button>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
