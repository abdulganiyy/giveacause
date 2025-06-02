"use client";

import { useState } from "react";
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
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

// Mock data for campaigns
const campaignsData = [
  {
    id: 1,
    title: "Help Sarah Rebuild After House Fire",
    description:
      "Sarah and her two young children lost everything when their home was destroyed in a devastating house fire. They need our help to rebuild their lives.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    category: "Emergency",
    goalAmount: 50000,
    raisedAmount: 32750,
    donorCount: 247,
    daysLeft: 23,
    featured: true,
    trending: true,
  },
  {
    id: 2,
    title: "Life-Saving Surgery for Max",
    description:
      "Max needs an urgent heart surgery that his family cannot afford. Your donation could save his life.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
    category: "Medical",
    goalAmount: 75000,
    raisedAmount: 45000,
    donorCount: 312,
    daysLeft: 15,
    featured: true,
    trending: false,
  },
  {
    id: 3,
    title: "Community Garden Project",
    description:
      "Help us transform an abandoned lot into a beautiful community garden that will provide fresh produce for local families.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=center",
    category: "Community",
    goalAmount: 15000,
    raisedAmount: 9800,
    donorCount: 124,
    daysLeft: 45,
    featured: false,
    trending: true,
  },
  {
    id: 4,
    title: "Support Local Animal Shelter",
    description:
      "Our animal shelter is at capacity and needs funds for food, medical care, and facility improvements.",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop&crop=center",
    category: "Animals",
    goalAmount: 20000,
    raisedAmount: 12500,
    donorCount: 189,
    daysLeft: 30,
    featured: false,
    trending: true,
  },
  {
    id: 5,
    title: "College Fund for First-Generation Students",
    description:
      "Help provide scholarships for talented students who are the first in their families to attend college.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=center",
    category: "Education",
    goalAmount: 100000,
    raisedAmount: 67500,
    donorCount: 423,
    daysLeft: 60,
    featured: true,
    trending: false,
  },
  {
    id: 6,
    title: "Rebuild Local School After Tornado",
    description:
      "Our town's elementary school was severely damaged by a tornado. Help us rebuild it for our children.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&crop=center",
    category: "Emergency",
    goalAmount: 200000,
    raisedAmount: 125000,
    donorCount: 578,
    daysLeft: 90,
    featured: false,
    trending: false,
  },
  {
    id: 7,
    title: "Clean Water Initiative",
    description:
      "Help us bring clean drinking water to communities that currently lack access to this basic necessity.",
    image:
      "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=600&h=400&fit=crop&crop=center",
    category: "Environment",
    goalAmount: 35000,
    raisedAmount: 21000,
    donorCount: 210,
    daysLeft: 40,
    featured: false,
    trending: false,
  },
  {
    id: 8,
    title: "Support for Veterans Housing Project",
    description:
      "We're building affordable housing for homeless veterans in our community. Your donation makes a difference.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center",
    category: "Housing",
    goalAmount: 150000,
    raisedAmount: 98000,
    donorCount: 356,
    daysLeft: 75,
    featured: false,
    trending: false,
  },
];

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

  const featuredCampaigns = campaignsData.filter(
    (campaign) => campaign.featured
  );
  const trendingCampaigns = campaignsData.filter(
    (campaign) => campaign.trending
  );

  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Categories" ||
      campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort campaigns based on selected sort option
  const sortedCampaigns = [...filteredCampaigns].sort((a, b) => {
    if (sortBy === "Most Recent") {
      return b.id - a.id;
    } else if (sortBy === "Most Funded") {
      return b.raisedAmount - a.raisedAmount;
    } else if (sortBy === "Ending Soon") {
      return a.daysLeft - b.daysLeft;
    }
    return 0;
  });

  const renderCampaignCard = (campaign: (typeof campaignsData)[0]) => {
    return (
      <Link
        href={`/campaigns/${campaign.id}`}
        key={campaign.id}
        className="block transition-transform hover:scale-[1.02]"
      >
        <Card className="h-full overflow-hidden">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={campaign.image || "/placeholder.svg"}
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
                    {formatCurrency(campaign.raisedAmount)}
                  </span>
                  <span className="text-gray-500">
                    of {formatCurrency(campaign.goalAmount)}
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
                <span>{campaign.daysLeft} days left</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      </Link>
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
              Make a Difference Today
            </h1>
            <p className="text-xl text-gray-600">
              Discover campaigns that need your support or start your own
              fundraiser
            </p>
            <div className="flex justify-center space-x-4 pt-4">
              <Button className="bg-green-600 hover:bg-green-700" size="lg">
                Donate Now
              </Button>
              <Button variant="outline" size="lg">
                Start Fundraising
              </Button>
            </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCampaigns.map(renderCampaignCard)}
            </div>
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
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedCampaigns.map(renderCampaignCard)}
              </div>
              {sortedCampaigns.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    No campaigns found matching your criteria.
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="trending">
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
            </TabsContent>
          </Tabs>
        </section>

        {/* Pagination */}
        <section className="flex justify-center mt-12">
          <Button variant="outline" className="mx-1">
            Previous
          </Button>
          <Button variant="outline" className="mx-1 bg-green-50">
            1
          </Button>
          <Button variant="outline" className="mx-1">
            2
          </Button>
          <Button variant="outline" className="mx-1">
            3
          </Button>
          <Button variant="outline" className="mx-1">
            Next
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
