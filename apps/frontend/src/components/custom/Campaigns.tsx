"use client";
import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
import { Skeleton } from "@/components/ui/skeleton";

export const campaignsData = [
  {
    id: 1,
    title: "Help Sarah Rebuild After House Fire",
    description:
      "Sarah and her two young children lost everything when their home was destroyed in a devastating house fire. They need our help to rebuild their lives.",
    fullDescription:
      "On December 15th, Sarah and her two young children lost everything when their home was destroyed in a devastating house fire. Thankfully, everyone escaped safely, but they now face the overwhelming task of rebuilding their lives from scratch. Sarah is a single mother who works as a nurse, dedicating her life to helping others. Now, she needs our help.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&crop=center",
    category: "Emergency",
    goalAmount: 50000,
    raisedAmount: 32750,
    donorCount: 247,
    daysLeft: 23,
    featured: true,
    trending: true,
    organizer: {
      name: "Michael Johnson",
      relationship: "Family Friend",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 2,
    title: "Life-Saving Surgery for Max",
    description:
      "Max needs an urgent heart surgery that his family cannot afford. Your donation could save his life.",
    fullDescription:
      "Max, a 7-year-old boy, has been diagnosed with a rare heart condition that requires immediate surgery. His family has exhausted their savings and insurance coverage, but they're still short of the amount needed for this life-saving procedure. Max is a bright, energetic child who loves soccer and dreams of becoming a doctor someday. With your help, we can ensure he gets the chance to pursue those dreams.",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
    category: "Medical",
    goalAmount: 75000,
    raisedAmount: 45000,
    donorCount: 312,
    daysLeft: 15,
    featured: true,
    trending: false,
    organizer: {
      name: "Rebecca Miller",
      relationship: "Family Friend",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 3,
    title: "Community Garden Project",
    description:
      "Help us transform an abandoned lot into a beautiful community garden that will provide fresh produce for local families.",
    fullDescription:
      "Our neighborhood has an abandoned lot that has become an eyesore and safety concern. We have permission from the city to transform it into a community garden that will provide fresh, organic produce for local families, including those who can't afford healthy food options. The garden will also serve as an educational space for local schools and a gathering place for community events. Your donation will help us purchase soil, seeds, tools, and build accessible garden beds.",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&crop=center",
    category: "Community",
    goalAmount: 15000,
    raisedAmount: 9800,
    donorCount: 124,
    daysLeft: 45,
    featured: false,
    trending: true,
    organizer: {
      name: "Jamal Washington",
      relationship: "Community Leader",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 4,
    title: "Support Local Animal Shelter",
    description:
      "Our animal shelter is at capacity and needs funds for food, medical care, and facility improvements.",
    fullDescription:
      "Our local animal shelter is currently housing over 200 animals, which is well beyond our intended capacity. We urgently need funds to provide proper food, medical care, and essential facility improvements to ensure these animals receive the care they deserve. Your donation will directly impact the lives of these animals, providing them with proper nutrition, necessary medical treatments, and a more comfortable environment while they wait for their forever homes.",
    image:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=400&fit=crop&crop=center",
    category: "Animals",
    goalAmount: 20000,
    raisedAmount: 12500,
    donorCount: 189,
    daysLeft: 30,
    featured: false,
    trending: true,
    organizer: {
      name: "Emma Rodriguez",
      relationship: "Shelter Director",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 5,
    title: "College Fund for First-Generation Students",
    description:
      "Help provide scholarships for talented students who are the first in their families to attend college.",
    fullDescription:
      "Education can break the cycle of poverty, but many talented students can't afford college tuition. Our scholarship fund specifically targets first-generation college students from low-income backgrounds who have demonstrated academic excellence and community involvement. Your donation will help cover tuition, books, and living expenses for these deserving students, giving them the opportunity to build a better future for themselves and their families.",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=center",
    category: "Education",
    goalAmount: 100000,
    raisedAmount: 67500,
    donorCount: 423,
    daysLeft: 60,
    featured: true,
    trending: false,
    organizer: {
      name: "Dr. Patricia Lee",
      relationship: "Education Foundation Director",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 6,
    title: "Rebuild Local School After Tornado",
    description:
      "Our town's elementary school was severely damaged by a tornado. Help us rebuild it for our children.",
    fullDescription:
      "Last month, a devastating EF-3 tornado tore through our small town, causing significant damage to our only elementary school. While insurance will cover some of the rebuilding costs, we need additional funds to ensure the new school has proper safety features, updated learning technology, and accessible facilities for all students. The 350 students are currently attending classes in temporary facilities, but we need to rebuild quickly to provide them with a proper learning environment.",
    image:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&crop=center",
    category: "Emergency",
    goalAmount: 200000,
    raisedAmount: 125000,
    donorCount: 578,
    daysLeft: 90,
    featured: false,
    trending: false,
    organizer: {
      name: "Principal Robert Thompson",
      relationship: "School Principal",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 7,
    title: "Clean Water Initiative",
    description:
      "Help us bring clean drinking water to communities that currently lack access to this basic necessity.",
    fullDescription:
      "Access to clean water is a fundamental human right, yet millions around the world still lack this basic necessity. Our organization is working to install water purification systems in five villages in rural East Africa where residents currently walk miles each day to collect water that is often contaminated. Your donation will help fund the drilling of wells, installation of filtration systems, and education programs to ensure sustainable water management for generations to come.",
    image:
      "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=600&h=400&fit=crop&crop=center",
    category: "Environment",
    goalAmount: 35000,
    raisedAmount: 21000,
    donorCount: 210,
    daysLeft: 40,
    featured: false,
    trending: false,
    organizer: {
      name: "Daniel Okafor",
      relationship: "Project Director",
      avatar: "/placeholder-user.jpg",
    },
  },
  {
    id: 8,
    title: "Support for Veterans Housing Project",
    description:
      "We're building affordable housing for homeless veterans in our community. Your donation makes a difference.",
    fullDescription:
      "After serving our country, no veteran should be without a home. Yet in our community, over 50 veterans are currently homeless. We're partnering with local contractors and volunteers to build a 20-unit housing complex specifically for veterans in need. These apartments will be offered at significantly reduced rent, with support services on-site to help with employment, healthcare, and reintegration. Your donation will help cover construction costs and ensure these heroes have a safe place to call home.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop&crop=center",
    category: "Housing",
    goalAmount: 150000,
    raisedAmount: 98000,
    donorCount: 356,
    daysLeft: 75,
    featured: false,
    trending: false,
    organizer: {
      name: "Colonel James Wilson (Ret.)",
      relationship: "Veterans Support Organization",
      avatar: "/placeholder-user.jpg",
    },
  },
];

// import { fetchFeaturedCampaigns } from "@/lib/api"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchFeaturedCampaigns() {
  await delay(600);
  return campaignsData.filter((campaign) => campaign.featured);
}

const Campaigns = () => {
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
  // Fetch featured campaigns
  const { data: featuredCampaigns = [], isLoading: isLoadingFeatured } =
    useQuery({
      queryKey: ["featuredCampaigns"],
      queryFn: fetchFeaturedCampaigns,
    });
  return (
    <>
      {/* <div className="py-10 px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        Trending Projects
      </h2>
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div> */}
      {/* Featured Campaigns */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover inspiring stories and help make a difference in people's
              lives
            </p>
          </div>

          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-2 w-full mb-4" />
                      <div className="flex justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCampaigns.slice(0, 3).map((campaign) => (
                <Link href={`/campaign/${campaign.id}`} key={campaign.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative h-48">
                      <Image
                        src={campaign.image || "/placeholder.svg"}
                        alt={campaign.title}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-white text-gray-800">
                        {campaign.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-1">
                        {campaign.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {campaign.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
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
                            className="h-2"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{campaign.donorCount} donors</span>
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/campaigns">
              <Button variant="outline" size="lg">
                View All Campaigns
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Campaigns;
