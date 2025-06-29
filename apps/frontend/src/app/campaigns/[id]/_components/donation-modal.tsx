"use client";
// import type React from "react";
import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  X,
  AlertCircle,
  Heart,
  DollarSign,
  Loader2,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

import { submitDonation } from "@/lib/api";

// Define predefined donation amounts
const SUGGESTED_AMOUNTS = [500, 1000, 5000, 10000, 20000];
const TIP_PERCENTAGES = [0, 10, 15, 20];

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  campaignId: string;
  campaignTitle: string;
  paystackSubAccountId: string;
  campaignCreatorName: string;
  campaignStatus: string;
}

export default function DonationModal({
  isOpen,
  onClose,
  onOpen,
  campaignId,
  campaignTitle,
  paystackSubAccountId,
  campaignCreatorName,
  campaignStatus,
}: DonationModalProps) {
  const [donationAmount, setDonationAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>("");
  const [donorName, setDonorName] = useState<string>("");
  const [donorEmail, setDonorEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [anonymous, setAnonymous] = useState<boolean>(false);
  const [useCustomAmount, setUseCustomAmount] = useState<boolean>(false);
  const [useCustomTip, setUseCustomTip] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const { data: user } = useUser();

  const queryClient = useQueryClient();

  const finalDonationAmount = useCustomAmount
    ? Number.parseFloat(customAmount) || 0
    : donationAmount;
  const platformTip = useCustomTip
    ? Number.parseFloat(customTip) || 0
    : Math.round(((finalDonationAmount * tipPercentage) / 100) * 100) / 100;
  const totalAmount = finalDonationAmount + platformTip;

  // const formatCurrency = (amount: number) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: "NGN",
  //     minimumFractionDigits: 0,
  //     maximumFractionDigits: 0,
  //   }).format(amount);
  // };

  // console.log(paystackSubAccountId);

  // Mutation for submitting donation
  const { mutate, isPending } = useMutation({
    mutationFn: submitDonation,
    onSuccess: () => {
      // Invalidate and refetch donations query
      queryClient.invalidateQueries({ queryKey: ["donations", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId] });
      setSuccess(true);
      onOpen();
    },
    onError: (error) => {
      setError("Failed to process donation. Please try again.");
      console.error("Donation error:", error);
      onOpen();
    },
  });

  // Paystack configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: donorEmail,
    amount: totalAmount * 100, // Paystack amount is in kobo (100 kobo = 1 Naira)
    publicKey:
      process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_yourtestkeyhere",
    subaccount: paystackSubAccountId,
    transaction_charge: platformTip * 100,
    bearer: "subaccount",
  };

  const initializePayment = usePaystackPayment(config as any);

  const handlePayment = () => {
    if (campaignStatus != "ACCEPTED") return;
    if ((!donorName && !anonymous) || !donorEmail || finalDonationAmount <= 0) {
      setError(
        "Please fill in all required fields and enter a valid donation amount"
      );
      return;
    }

    if (!/\S+@\S+\.\S+/.test(donorEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // toast(`${finalDonationAmount}, ${platformTip}, ${totalAmount}`);

    setError("");
    onClose();

    initializePayment({
      onSuccess: () => {
        mutate({
          campaignId,
          userId: user.userId,
          name: anonymous ? "Anonymous" : donorName,
          email: donorEmail,
          amount: finalDonationAmount,
          message,
          anonymous,
        });
      },
      onClose: () => {
        setError("Payment was cancelled.");
        onOpen();
      },
    });
  };

  const handleClose = () => {
    if (!isProcessing) {
      setDonationAmount(500);
      setCustomAmount("");
      setTipPercentage(15);
      setCustomTip("");
      setDonorName("");
      setDonorEmail("");
      setMessage("");
      setAnonymous(false);
      setUseCustomAmount(false);
      setUseCustomTip(false);
      setError("");
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
          onClick={() => onOpen()}
        >
          <span className="inline-block text-lg mr-2">₦</span>
          Donate Now
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        // onEscapeKeyDown={(e) => e.preventDefault()}
        className="max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Support {campaignTitle}</span>
          </DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-1 top-1 z-50 bg-white"
            onClick={() => handleClose()}
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogDescription>
            Your donation will help {campaignCreatorName} reach their goal
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Thank you for your donation!
            </h3>
            <p className="text-gray-600">
              Your ₦{finalDonationAmount.toFixed(2)} donation has been
              successfully processed.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Donation Amount */}
            <div>
              <Label className="text-base font-semibold">Donation Amount</Label>
              <div className="mt-3 space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {SUGGESTED_AMOUNTS.map((amount) => (
                    <Button
                      key={amount}
                      variant={
                        !useCustomAmount && donationAmount === amount
                          ? "default"
                          : "outline"
                      }
                      onClick={() => {
                        setDonationAmount(amount);
                        setUseCustomAmount(false);
                      }}
                      className="h-12"
                      disabled={isProcessing}
                    >
                      {/* ₦{amount} */}
                      {amount.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="custom-amount"
                    checked={useCustomAmount}
                    onCheckedChange={(checked) =>
                      setUseCustomAmount(checked as boolean)
                    }
                    disabled={isProcessing}
                  />
                  <Label htmlFor="custom-amount">Other amount</Label>
                </div>
                {useCustomAmount && (
                  <div className="relative">
                    {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}

                    <span className="absolute left-3 top-[14px] transform -translate-y-1/2 h-4 w-4 text-gray-400">
                      ₦
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-10"
                      min="1"
                      disabled={isProcessing}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Platform Tip */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2 mb-3">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">
                      Support FundHope
                    </h4>
                    <p className="text-sm text-blue-700">
                      Help us keep the platform running and support more causes
                      like this one
                    </p>
                  </div>
                </div>

                <RadioGroup
                  value={useCustomTip ? "custom" : tipPercentage.toString()}
                  onValueChange={(value) => {
                    if (value === "custom") {
                      setUseCustomTip(true);
                    } else {
                      setUseCustomTip(false);
                      setTipPercentage(Number.parseInt(value));
                    }
                  }}
                  className="grid grid-cols-2 gap-2"
                  disabled={isProcessing}
                >
                  {TIP_PERCENTAGES.map((percentage) => (
                    <div
                      key={percentage}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={percentage.toString()}
                        id={`tip-${percentage}`}
                      />
                      <Label htmlFor={`tip-${percentage}`} className="text-sm">
                        {percentage === 0
                          ? "No tip"
                          : `${percentage}% (₦${Math.round(((finalDonationAmount * percentage) / 100) * 100) / 100})`}
                      </Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="tip-custom" />
                    <Label htmlFor="tip-custom" className="text-sm">
                      Custom
                    </Label>
                  </div>
                </RadioGroup>

                {useCustomTip && (
                  <div className="mt-3 relative">
                    {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> */}
                    <span className="absolute left-3 top-[14px] transform -translate-y-1/2 h-4 w-4 text-gray-400">
                      ₦
                    </span>
                    <Input
                      type="number"
                      placeholder="Enter tip amount"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      className="pl-10"
                      min="0"
                      step="0.01"
                      disabled={isProcessing}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Total Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Your donation</span>
                    <span>
                      {/* ₦{finalDonationAmount.toFixed(2)} */}
                      {finalDonationAmount.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GiveACause tip</span>
                    <span>
                      {/* ₦{platformTip.toFixed(2)} */}
                      {platformTip.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>
                      {/* ₦{totalAmount.toFixed(2)} */}
                      {totalAmount.toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donor Information */}
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Your Information
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="donor-name">Full Name *</Label>
                  <Input
                    id="donor-name"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <Label htmlFor="donor-email">Email Address *</Label>
                  <Input
                    id="donor-email"
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a message of support..."
                  rows={3}
                  disabled={isProcessing}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="anonymous"
                  checked={anonymous}
                  onCheckedChange={(checked) =>
                    setAnonymous(checked as boolean)
                  }
                  disabled={isProcessing}
                />
                <Label htmlFor="anonymous">Make this donation anonymous</Label>
              </div>
            </div>

            {/* Payment Button */}
            <div className="flex space-x-3">
              <Button
                onClick={handlePayment}
                className="flex-1 bg-green-600 hover:bg-green-700"
                size="lg"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="mr-2 h-4 w-4" />
                    Donate{" "}
                    {totalAmount.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleClose}
                size="lg"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
