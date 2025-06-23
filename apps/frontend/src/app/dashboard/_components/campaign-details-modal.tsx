"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  DollarSign,
  Users,
  Target,
  Clock,
  Mail,
  ExternalLink,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import type { Campaign } from "@/lib/api"

interface CampaignDetailsModalProps {
  campaign: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function CampaignDetailsModal({
  campaign,
  isOpen,
  onClose,
}: CampaignDetailsModalProps) {
  if (!campaign) return null;

  console.log(campaign);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const progressPercentage = Math.round(
    (campaign.raisedAmount / campaign.goalAmount) * 100
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Campaign Details</span>
            <Button variant="outline" size="sm" asChild>
              <Link href={`/campaign/${campaign.id}`} target="_blank">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Live
              </Link>
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Header */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
              <Image
                src={campaign.imageUrl || "/placeholder.svg"}
                alt={campaign.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {campaign.title}
                </h2>
                <Badge
                  variant={
                    campaign.status === "active"
                      ? "default"
                      : campaign.status === "inactive"
                        ? "secondary"
                        : "outline"
                  }
                  className="mb-4"
                >
                  {campaign.status === "active"
                    ? "Active"
                    : campaign.status === "inactive"
                      ? "Inactive"
                      : "Ended"}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created on {formatDate(campaign.createdAt)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {campaign.daysLeft > 0
                    ? `${campaign.daysLeft} days left`
                    : "Campaign ended"}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Target className="h-4 w-4 mr-2" />
                  <Badge variant="outline">{campaign.category?.name}</Badge>
                </div>
              </div>

              {/* Campaign Flags */}
              <div className="flex gap-2">
                {campaign.featured && <Badge variant="default">Featured</Badge>}
                {campaign.trending && (
                  <Badge variant="secondary">Trending</Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Funding Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Funding Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(campaign.raisedAmount)}
                  </p>
                  <p className="text-sm text-gray-600">Raised</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(campaign.goalAmount)}
                  </p>
                  <p className="text-sm text-gray-600">Goal</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {campaign.donorCount}
                  </p>
                  <p className="text-sm text-gray-600">Donors</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{progressPercentage}% of goal reached</span>
                  <span>
                    {formatCurrency(
                      campaign.goalAmount - campaign.raisedAmount
                    )}{" "}
                    remaining
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Organizer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Campaign Organizer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={campaign.creator.avatarUrl || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {campaign.creator.firstname
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {campaign.creator.name}
                  </h3>
                  <p className="text-gray-600">
                    {campaign.creator.relationship}
                  </p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-1" />
                    Contact organizer
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Description */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Story</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Short Description</h4>
                  <p className="text-gray-700">{campaign.description}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2">Full Story</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {campaign.fullDescription}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">
                    {campaign.donorCount}
                  </p>
                  <p className="text-sm text-gray-600">Total Donors</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">
                    {campaign.donorCount > 0
                      ? formatCurrency(
                          campaign.raisedAmount / campaign.donorCount
                        )
                      : "$0"}
                  </p>
                  <p className="text-sm text-gray-600">Avg. Donation</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">
                    {progressPercentage}%
                  </p>
                  <p className="text-sm text-gray-600">Goal Progress</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-gray-900">
                    {campaign.daysLeft}
                  </p>
                  <p className="text-sm text-gray-600">Days Remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Campaign ID:</span>
                  <span className="ml-2 text-gray-600">#{campaign.id}</span>
                </div>
                <div>
                  <span className="font-semibold">Category:</span>
                  <span className="ml-2 text-gray-600">
                    {campaign.category?.name}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Created:</span>
                  <span className="ml-2 text-gray-600">
                    {formatDate(campaign.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Status:</span>
                  <span className="ml-2 text-gray-600 capitalize">
                    {campaign.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Featured:</span>
                  <span className="ml-2 text-gray-600">
                    {campaign.featured ? "Yes" : "No"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Trending:</span>
                  <span className="ml-2 text-gray-600">
                    {campaign.trending ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
