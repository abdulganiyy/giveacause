// Paystack configuration and utilities
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "pk_test_your_public_key"

export interface PaystackSplitConfig {
  type: "percentage" | "flat"
  currency: "NGN" | "USD" | "GHS" | "ZAR" | "KES"
  subaccounts: Array<{
    subaccount: string
    share: number
  }>
  bearer_type: "account" | "subaccount" | "all-proportional" | "all"
  bearer_subaccount?: string
}

export interface DonationPayment {
  amount: number
  campaignId: number
  donorEmail: string
  donorName: string
  message?: string
  anonymous: boolean
  platformTip: number
  currency: string
}

export function calculateSplitPayment(
  donationAmount: number,
  platformTip: number,
  campaignOwnerSubaccount: string,
): PaystackSplitConfig {
  const totalAmount = donationAmount + platformTip
  const platformShare = (platformTip / totalAmount) * 100
  const campaignShare = (donationAmount / totalAmount) * 100

  return {
    type: "percentage",
    currency: "USD",
    subaccounts: [
      {
        subaccount: campaignOwnerSubaccount,
        share: Math.round(campaignShare * 100) / 100,
      },
      {
        subaccount: process.env.NEXT_PUBLIC_PLATFORM_SUBACCOUNT || "ACCT_platform",
        share: Math.round(platformShare * 100) / 100,
      },
    ],
    bearer_type: "all-proportional",
  }
}

export function initializePaystackPayment(paymentData: DonationPayment, splitConfig: PaystackSplitConfig) {
  return {
    publicKey: PAYSTACK_PUBLIC_KEY,
    email: paymentData.donorEmail,
    amount: (paymentData.amount + paymentData.platformTip) * 100, // Convert to kobo/cents
    currency: paymentData.currency,
    ref: `donation_${paymentData.campaignId}_${Date.now()}`,
    // metadata: {
    //   custom_fields:[{
    //   campaignId: paymentData.campaignId,
    //   donorName: paymentData.donorName,
    //   message: paymentData.message,
    //   anonymous: paymentData.anonymous,
    //   platformTip: paymentData.platformTip,
    // }]
      
    // },
    // split: splitConfig,
    callback: (response: any) => {
      // Handle successful payment
      console.log("Payment successful:", response)
    },
    onClose: () => {
      console.log("Payment modal closed")
    },
  }
}
