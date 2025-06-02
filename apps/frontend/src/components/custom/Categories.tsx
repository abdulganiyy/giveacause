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
import {
  Heart,
  Users,
  DollarSign,
  Award,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Globe,
  TrendingUp,
  Play,
} from "lucide-react";
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

const categories = [
  {
    name: "Medical",
    description: "Help cover medical expenses and treatments",
    icon: "🏥",
    color: "bg-red-100 text-red-800",
    campaigns: 324,
  },
  {
    name: "Emergency",
    description: "Support those facing unexpected crises",
    icon: "🚨",
    color: "bg-orange-100 text-orange-800",
    campaigns: 189,
  },
  {
    name: "Education",
    description: "Fund educational opportunities and scholarships",
    icon: "🎓",
    color: "bg-blue-100 text-blue-800",
    campaigns: 156,
  },
  {
    name: "Community",
    description: "Build stronger communities together",
    icon: "🏘️",
    color: "bg-green-100 text-green-800",
    campaigns: 203,
  },
  {
    name: "Animals",
    description: "Protect and care for animals in need",
    icon: "🐾",
    color: "bg-purple-100 text-purple-800",
    campaigns: 98,
  },
  {
    name: "Environment",
    description: "Support environmental conservation efforts",
    icon: "🌱",
    color: "bg-emerald-100 text-emerald-800",
    campaigns: 87,
  },
];

export default function Categories() {
  const items = [
    {
      title: "Education",
      image: "/children.jpg",
    },
    {
      title: "Medical Support",
      image: "/children.jpg",
    },
    {
      title: "Disaster Relief",
      image: "/children.jpg",
    },
    {
      title: "Mosque",
      image: "/children.jpg",
    },
  ];

  return (
    <>
      {/* <section className="py-10 px-6 md:px-12 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
        Campaign Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative h-72 rounded-2xl overflow-hidden group"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-semibold drop-shadow-lg">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section> */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Fundraise for Any Cause
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whatever your cause, we're here to help you raise money and
              awareness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{category.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <Badge variant="secondary" className={category.color}>
                          {category.campaigns}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
