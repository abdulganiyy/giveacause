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

import { fetchFeaturedCampaigns } from "@/lib/api";
import { getDaysBetweenDates } from "@/lib/utils";

// import { fetchFeaturedCampaigns } from "@/lib/api"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Campaigns = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (raised: number, goal: number) => {
    return (raised / goal) * 100;
  };
  // Fetch featured campaigns
  const { data: featuredCampaignsData, isLoading: isLoadingFeatured } =
    useQuery({
      queryKey: ["featuredCampaigns"],
      queryFn: fetchFeaturedCampaigns,
    });

  const featuredCampaigns = featuredCampaignsData?.data || [];
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
              {featuredCampaigns.slice(0, 3).map((campaign: any) => (
                <Link href={`/campaigns/${campaign.id}`} key={campaign.id}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="relative h-48">
                      <Image
                        src={campaign.imageUrl || "/placeholder.svg"}
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
                              {formatCurrency(campaign.currentAmount)}
                            </span>
                            <span className="text-gray-500">
                              of {formatCurrency(campaign.targetAmount)}
                            </span>
                          </div>
                          <Progress
                            value={calculateProgress(
                              campaign.currentAmount,
                              campaign.targetAmount
                            )}
                            className="h-2"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>{campaign.donations.length} donors</span>
                          <span>
                            {getDaysBetweenDates(campaign.deadline)} days left
                          </span>
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
