"use client";

import Link from "next/link";
import {
  Heart,
  Shield,
  Eye,
  Lock,
  Users,
  FileText,
  Mail,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/custom/Footer";
import NavBar from "@/components/custom/NavBar";

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 20, 2025";
  const effectiveDate = "June 30, 2025";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-500">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>Effective Date: {effectiveDate}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span>Last Updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Welcome to GiveACause ("we", "our", or "us"). Your privacy is
                  important to us. This Privacy Policy explains how we collect,
                  use, disclose, and safeguard your information when you visit
                  or use our website giveacause.com, including any other media
                  form, media channel, mobile website, or mobile application
                  related or connected thereto (collectively, the "Platform").
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  By using our Platform, you agree to the terms of this Privacy
                  Policy.
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Information We Collect */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  1. Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We may collect the following types of personal information:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Personal Details
                    </h4>
                    <p className="text-sm text-gray-600">
                      Name, email, phone number, date of birth, address, and
                      profile picture.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Campaign Information
                    </h4>
                    <p className="text-sm text-gray-600">
                      Descriptions, updates, photos, videos, and beneficiary
                      information.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Financial Information
                    </h4>
                    <p className="text-sm text-gray-600">
                      Bank account details, payment information, and transaction
                      data.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Usage Data
                    </h4>
                    <p className="text-sm text-gray-600">
                      IP address, browser type, device type, pages visited, and
                      click behavior.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: How We Use Your Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Lock className="h-6 w-6 text-green-600 mr-3" />
                  2. How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  We use your information for the following purposes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To create and manage user accounts
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To verify campaign and identity information
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To facilitate secure donations and withdrawals
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To communicate updates, receipts, and support messages
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To enforce our platform rules and detect fraud or abuse
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    To improve and personalize user experience
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 3: How We Share Your Information */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  3. How We Share Your Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">We may share your information with:</p>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Payment Processors</h4>
                    <p className="text-gray-600">
                      (e.g., Paystack, Stripe) to facilitate donations and
                      withdrawals
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Compliance Partners</h4>
                    <p className="text-gray-600">
                      (e.g., KYC verification providers) to comply with local
                      regulations
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Law Enforcement</h4>
                    <p className="text-gray-600">
                      Or government agencies if required by law
                    </p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Analytics Tools</h4>
                    <p className="text-gray-600">
                      (e.g., Google Analytics) to improve platform performance
                    </p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-semibold">
                    We do not sell your personal information to any third
                    parties.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Data Security */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">4. Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  We implement industry-standard security measures to protect
                  your data, including:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Encryption</h4>
                    <p className="text-sm text-gray-600">
                      Data encrypted in transit and at rest
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Secure Access</h4>
                    <p className="text-sm text-gray-600">
                      Multi-factor authentication
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Monitoring</h4>
                    <p className="text-sm text-gray-600">
                      24/7 security monitoring
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  However, no method of transmission over the internet is 100%
                  secure.
                </p>
              </CardContent>
            </Card>

            {/* Section 5: Your Rights */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">5. Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">You have the right to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Badge variant="outline" className="p-3 justify-start">
                    Access your personal information
                  </Badge>
                  <Badge variant="outline" className="p-3 justify-start">
                    Update or correct your data
                  </Badge>
                  <Badge variant="outline" className="p-3 justify-start">
                    Delete your account and data
                  </Badge>
                  <Badge variant="outline" className="p-3 justify-start">
                    Withdraw consent (where applicable)
                  </Badge>
                  <Badge variant="outline" className="p-3 justify-start">
                    Data portability
                  </Badge>
                  <Badge variant="outline" className="p-3 justify-start">
                    Lodge a complaint with authorities
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Data Retention */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">6. Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We retain your data as long as your account is active or as
                  needed to comply with legal obligations. Specific retention
                  periods:
                </p>
                <ul className="mt-4 space-y-2">
                  <li>• Account information: Until account deletion</li>
                  <li>
                    • Transaction records: 7 years for tax and legal compliance
                  </li>
                  <li>• Campaign data: Until campaign completion + 2 years</li>
                  <li>• Support communications: 3 years</li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 7: Cookies */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  7. Cookies & Tracking Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  We use cookies and similar technologies to improve your
                  experience. Types of cookies we use:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-1"></span>
                    <div>
                      <h4 className="font-semibold">Essential Cookies</h4>
                      <p className="text-gray-600">
                        Required for basic platform functionality
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-1"></span>
                    <div>
                      <h4 className="font-semibold">Analytics Cookies</h4>
                      <p className="text-gray-600">
                        Help us understand how you use our platform
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mt-1"></span>
                    <div>
                      <h4 className="font-semibold">Preference Cookies</h4>
                      <p className="text-gray-600">
                        Remember your settings and preferences
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  You can manage cookies via your browser settings.
                </p>
              </CardContent>
            </Card>

            {/* Section 8: Children's Privacy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  8. Children's Privacy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We do not knowingly collect personal data from anyone under 18
                  years of age without parental consent. If you are a parent or
                  guardian and believe your child has provided us with personal
                  information, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* Section 9: International Transfers */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  9. International Data Transfers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place to protect your data in accordance
                  with this Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Section 10: Changes to Policy */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  10. Changes to This Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We may update this Privacy Policy at any time. Changes will be
                  posted on this page with an updated effective date. We
                  encourage you to review this Privacy Policy periodically for
                  any changes.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">
                  11. Contact Us
                </CardTitle>
                <CardDescription className="text-green-700">
                  If you have questions about this Privacy Policy, please
                  contact us:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-green-700">info@giveacause.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-green-700">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
