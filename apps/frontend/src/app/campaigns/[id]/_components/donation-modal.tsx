"use client";

import type React from "react";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, X, AlertCircle, Heart } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { submitDonation } from "@/lib/api";

// Define predefined donation amounts
const DONATION_AMOUNTS = [500, 1000, 5000, 10000, 20000];

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignId: string;
  campaignTitle: string;
}

export default function DonationModal({
  isOpen,
  onClose,
  campaignId,
  campaignTitle,
}: DonationModalProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const queryClient = useQueryClient();

  // Mutation for submitting donation
  const { mutate, isPending } = useMutation({
    mutationFn: submitDonation,
    onSuccess: () => {
      // Invalidate and refetch donations query
      queryClient.invalidateQueries({ queryKey: ["donations", campaignId] });
      queryClient.invalidateQueries({ queryKey: ["campaign", campaignId] });
      setPaymentSuccess(true);
      setStep(3);
    },
    onError: (error) => {
      setPaymentError("Failed to process donation. Please try again.");
      console.error("Donation error:", error);
    },
  });

  // Calculate the actual amount to use (either predefined or custom)
  const actualAmount = customAmount ? Number.parseFloat(customAmount) : amount;

  // Paystack configuration
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: actualAmount * 100, // Paystack amount is in kobo (100 kobo = 1 Naira)
    publicKey:
      process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_yourtestkeyhere",
  };

  // Initialize Paystack payment hook
  const initializePayment = usePaystackPayment(config);

  // Handle form submission for step 1
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || actualAmount <= 0) {
      setPaymentError("Please fill in all required fields.");
      return;
    }
    setPaymentError(null);
    setStep(2);
  };

  // Handle payment initialization
  const handlePayment = () => {
    // You can perform additional validation here
    initializePayment({
      onSuccess: () => {
        // Submit donation to your API after successful payment
        mutate({
          campaignId,
          name: anonymous ? "Anonymous" : name,
          email,
          amount: actualAmount,
          message,
          anonymous,
        });
      },
      onClose: () => {
        setPaymentError("Payment was cancelled.");
      },
    });
  };

  // Handle modal close and reset state
  const handleClose = () => {
    if (!isPending) {
      onClose();
      // Reset state after animation completes
      setTimeout(() => {
        setStep(1);
        setAmount(50);
        setCustomAmount("");
        setName("");
        setEmail("");
        setMessage("");
        setAnonymous(false);
        setPaymentError(null);
        setPaymentSuccess(false);
      }, 300);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                Make a Donation
              </DialogTitle>
              <DialogDescription>
                Support "{campaignTitle}" with your contribution.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleStep1Submit} className="space-y-6 py-4">
              {paymentError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{paymentError}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="amount">Select Donation Amount</Label>
                <RadioGroup
                  defaultValue={amount.toString()}
                  onValueChange={(value) => {
                    setAmount(Number.parseInt(value));
                    setCustomAmount("");
                  }}
                  className="grid grid-cols-3 gap-2"
                >
                  {DONATION_AMOUNTS.map((amt) => (
                    <div key={amt} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={amt.toString()}
                        id={`amount-${amt}`}
                      />
                      <Label
                        htmlFor={`amount-${amt}`}
                        className="cursor-pointer"
                      >
                        {formatCurrency(amt)}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customAmount">Custom Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    ₦
                  </span>
                  <Input
                    id="customAmount"
                    placeholder="Enter amount"
                    className="pl-8"
                    value={customAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow numbers and decimal point
                      if (value === "" || /^\d+(\.\d{0,2})?$/.test(value)) {
                        setCustomAmount(value);
                        setAmount(0); // Clear selected amount
                      }
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!anonymous}
                  disabled={anonymous}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={anonymous}
                  onChange={(e) => {
                    setAnonymous(e.target.checked);
                    if (e.target.checked) {
                      setName("Anonymous");
                    } else {
                      setName("");
                    }
                  }}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="anonymous" className="cursor-pointer">
                  Donate anonymously
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  placeholder="Add a message of support"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Continue
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>Confirm Your Donation</DialogTitle>
              <DialogDescription>
                Please review your donation details before proceeding to
                payment.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-4">
              {paymentError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{paymentError}</AlertDescription>
                </Alert>
              )}

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Donation Amount:</span>
                  <span className="font-semibold">
                    ${actualAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span>{anonymous ? "Anonymous" : name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span>{email}</span>
                </div>
                {message && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-600 block mb-1">Message:</span>
                    <p className="text-sm italic">"{message}"</p>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-500">
                <p>
                  By clicking "Proceed to Payment", you'll be redirected to
                  Paystack's secure payment gateway to complete your donation.
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={handlePayment}
                className="bg-green-600 hover:bg-green-700"
              >
                Proceed to Payment
              </Button>
            </DialogFooter>
          </>
        )}

        {step === 3 && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {paymentSuccess ? (
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                ) : (
                  <X className="h-5 w-5 text-red-500 mr-2" />
                )}
                {paymentSuccess
                  ? "Thank You for Your Donation!"
                  : "Payment Failed"}
              </DialogTitle>
            </DialogHeader>

            <div className="py-6">
              {paymentSuccess ? (
                <div className="text-center space-y-4">
                  <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <p>
                    Your donation of <strong>${actualAmount.toFixed(2)}</strong>{" "}
                    has been successfully processed. Thank you for your
                    generosity!
                  </p>
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      A receipt has been sent to your email address. Your
                      support makes a real difference!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                    <X className="h-8 w-8 text-red-500" />
                  </div>
                  <p>
                    We couldn't process your donation at this time. Please check
                    your payment details and try again.
                  </p>
                  <div className="pt-4">
                    <p className="text-sm text-gray-500">
                      If you continue to experience issues, please contact our
                      support team for assistance.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                onClick={handleClose}
                className={
                  paymentSuccess ? "bg-green-600 hover:bg-green-700" : ""
                }
              >
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
