"use client";

import { useState } from "react";
import {
  User,
  Settings,
  CheckCircle,
  CreditCard,
  Phone,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProfileCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToSettings: () => void;
  user: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    paystackSubaccount?: string;
    profileComplete: boolean;
    profileCompletionPercentage: number;
    missingFields: string[];
  };
}

export function ProfileCompletionModal({
  isOpen,
  onClose,
  onGoToSettings,
  user,
}: ProfileCompletionModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleCompleteProfile = () => {
    // if (dontShowAgain) {
    //   // In a real app, save this preference to user settings or localStorage
    //   localStorage.setItem("hideProfileCompletion", "true");
    // }
    onGoToSettings();
    onClose();
  };

  //   const handleRemindLater = () => {
  //     if (dontShowAgain) {
  //       localStorage.setItem("hideProfileCompletion", "true");
  //     }
  //     onClose();
  //   };

  const getFieldIcon = (field: string) => {
    switch (field) {
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "address":
        return <MapPin className="h-4 w-4" />;
      case "paystackSubaccount":
        return <CreditCard className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getFieldLabel = (field: string) => {
    switch (field) {
      case "phone":
        return "Phone Number";
      case "address":
        return "Address";
      case "paystackSubaccount":
        return "Payment Account";
      default:
        return field;
    }
  };

  const getCompletionMessage = () => {
    // if (user.profileCompletionPercentage >= 80) {
    //   return "You're almost done! Just a few more details to complete your profile.";
    // } else if (user.profileCompletionPercentage >= 50) {
    //   return "You're halfway there! Complete your profile to unlock all features.";
    // } else {
    return "Complete your profile to get the most out of FundHope and build trust with donors.";
    // }
  };

  const benefits = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: "Build Trust",
      description: "Complete profiles receive 3x more donations",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: "Faster Withdrawals",
      description: "Verified accounts get instant fund transfers",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: "Better Visibility",
      description: "Complete profiles are featured more prominently",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      title: "Full Access",
      description: "Unlock all platform features and tools",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="h-6 w-6 text-blue-600" />
            <span>Complete Your Profile</span>
          </DialogTitle>
          <DialogDescription>{getCompletionMessage()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Section */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Completion</CardTitle>
              <CardDescription>
                {user.profileCompletionPercentage}% complete
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress
                value={user.profileCompletionPercentage}
                className="h-3"
              />

              {user.missingFields.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Missing Information:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {user.missingFields.map((field) => (
                      <div
                        key={field}
                        className="flex items-center space-x-2 text-sm text-gray-600"
                      >
                        {getFieldIcon(field)}
                        <span>{getFieldLabel(field)}</span>
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card> */}

          {/* Benefits Section */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Why Complete Your Profile?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {benefit.icon}
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card> */}

          {/* Special Alert for Payment Account */}
          {!user.paystackSubaccount && (
            <Alert>
              <CreditCard className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> You need to connect a payment
                account to receive donations. This is required before you can
                create campaigns or withdraw funds.
              </AlertDescription>
            </Alert>
          )}

          {/* Don't Show Again Option */}
          {/* <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="dontShowAgain"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="dontShowAgain" className="text-sm text-gray-600">
              Don't show this reminder again
            </label>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleCompleteProfile}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Settings className="mr-2 h-4 w-4" />
              Complete Profile Now
            </Button>
            {/* <Button
              variant="outline"
              onClick={handleRemindLater}
              className="flex-1"
              size="lg"
            >
              Remind Me Later
            </Button> */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
