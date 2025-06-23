"use client";
import {
  Calendar,
  DollarSign,
  Users,
  Target,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import type { User } from "@/lib/api"

interface UserDetailsModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserDetailsModal({
  user,
  isOpen,
  onClose,
}: UserDetailsModalProps) {
  if (!user) return null;

  console.log(user);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
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

  const getProfileCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Header */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <div className="text-center">
                <Avatar className="h-32 w-32 mx-auto mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl">
                    {`${user?.firstname + " " + user?.lastname}`
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {user.firstname}
                </h2>
                <Badge
                  variant={
                    user.status === "COMPLETED" ? "default" : "secondary"
                  }
                  className="mb-2"
                >
                  {user.status === "COMPLETED" ? "Active" : "Inactive"}
                </Badge>
                <Badge
                  variant={user.role === "admin" ? "destructive" : "outline"}
                >
                  {user.role === "admin" ? "Administrator" : "User"}
                </Badge>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-4">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-3 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  {user.phone ? (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{user.phone}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400">
                      <Phone className="h-4 w-4 mr-3" />
                      <span>Phone not provided</span>
                    </div>
                  )}
                  {user.address ? (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{user.address}</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-3" />
                      <span>Address not provided</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Account Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-3 text-gray-500" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                  {user.lastLoginAt && (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-3 text-gray-500" />
                      <span>Last login {formatDate(user.lastLoginAt)}</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">User ID:</span>
                    <span className="text-sm text-gray-600">#{user.id}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Separator />

          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Profile Completion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile Completion</span>
                <span
                  className={`text-sm font-bold ${getProfileCompletionColor(user.profileCompletionPercentage)}`}
                >
                  {user.profileCompletionPercentage}%
                </span>
              </div>
              <Progress
                value={user.profileCompletionPercentage}
                className="h-3"
              />

              {user?.missingFields?.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Missing Information:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {user?.missingFields?.map((field: any) => (
                      <Badge key={field} variant="outline" className="text-xs">
                        {field === "paystackSubaccount"
                          ? "Payment Account"
                          : field}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {user.profileComplete && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">Profile is complete</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Fundraising Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {user.campaignsCreated}
                    </p>
                    <p className="text-sm text-gray-600">Campaigns Created</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(user.totalRaised)}
                    </p>
                    <p className="text-sm text-gray-600">Total Raised</p>
                  </div>
                </div>
                {user.campaignsCreated > 0 && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(user.totalRaised / user.campaignsCreated)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Average per Campaign
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Donation Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {user.donationsMade}
                    </p>
                    <p className="text-sm text-gray-600">Donations Made</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(user.totalDonated)}
                    </p>
                    <p className="text-sm text-gray-600">Total Donated</p>
                  </div>
                </div>
                {user.donationsMade > 0 && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(user.totalDonated / user.donationsMade)}
                    </p>
                    <p className="text-sm text-gray-600">Average Donation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {user.paystackSubaccount ? (
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-3 text-green-500" />
                    <span className="text-sm">Payment account configured</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {user.paystackSubaccount}
                    </Badge>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 mr-3 text-red-500" />
                    <span className="text-sm text-red-600">
                      Payment account not configured
                    </span>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  {user.paystackSubaccount
                    ? "User can receive donations from their campaigns"
                    : "User cannot receive donations until payment account is set up"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>User Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">
                    Profile Completion Reminder:
                  </span>
                  <span className="ml-2 text-gray-600">
                    {user.profileCompletionReminderDismissed
                      ? "Dismissed"
                      : "Active"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Account Type:</span>
                  <span className="ml-2 text-gray-600 capitalize">
                    {user.role}
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
