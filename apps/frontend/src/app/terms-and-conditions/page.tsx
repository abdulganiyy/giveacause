"use client";

import Link from "next/link";
import {
  Heart,
  FileText,
  Scale,
  AlertTriangle,
  DollarSign,
  Shield,
  Users,
  Gavel,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/custom/Footer";
import NavBar from "@/components/custom/NavBar";

export default function TermsAndConditionsPage() {
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
              <Scale className="h-16 w-16 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms and Conditions
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Please read these terms carefully before using our platform. By
              using FundHope, you agree to these terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-500">
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>Effective Date: {effectiveDate}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
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
                  Welcome to GiveACause! These Terms and Conditions ("Terms")
                  govern your use of our crowdfunding platform at giveacause.com
                  and any of our services. These Terms constitute a legally
                  binding agreement between you and GiveACause.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mt-4">
                  By accessing or using the platform, you agree to comply with
                  these Terms. If you do not agree with these Terms, please do
                  not use our services.
                </p>
              </CardContent>
            </Card>

            {/* Section 1: Eligibility */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  1. Eligibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">To use our services, you must:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Be at least 18 years old
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Be capable of forming a binding contract under applicable
                    law
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Not be prohibited from using our services under applicable
                    laws
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Provide accurate and complete information
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Section 2: User Accounts */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">2. User Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Account Registration</h4>
                    <p className="text-gray-700">
                      You agree to provide accurate, current, and complete
                      information during registration and to update such
                      information to keep it accurate, current, and complete.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Account Security</h4>
                    <p className="text-gray-700">
                      You are responsible for safeguarding your password and all
                      activities that occur under your account. Notify us
                      immediately of any unauthorized use.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Account Termination</h4>
                    <p className="text-gray-700">
                      We may suspend or terminate your account if you violate
                      these Terms or engage in prohibited activities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Campaign Guidelines */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Heart className="h-6 w-6 text-green-600 mr-3" />
                  3. Campaign Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    All campaigns must comply with our guidelines. Violations
                    may result in campaign removal and account suspension.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">
                      ✅ Allowed
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Medical expenses</li>
                      <li>• Emergency relief</li>
                      <li>• Educational funding</li>
                      <li>• Community projects</li>
                      <li>• Animal welfare</li>
                      <li>• Environmental causes</li>
                    </ul>
                  </div>
                  <div className="border border-red-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">
                      ❌ Prohibited
                    </h4>
                    <ul className="text-sm space-y-1">
                      <li>• Illegal activities</li>
                      <li>• Fraudulent campaigns</li>
                      <li>• Hate speech or discrimination</li>
                      <li>• Political campaigns</li>
                      <li>• Investment opportunities</li>
                      <li>• Adult content</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <h4 className="font-semibold">Campaign Requirements:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Campaigns must be truthful, legal, and non-fraudulent
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      You must use funds only for the stated purposes
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      We reserve the right to verify campaign details
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Regular updates to donors are encouraged
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 4: Donations */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <DollarSign className="h-6 w-6 text-green-600 mr-3" />
                  4. Donations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Important Notice
                    </h4>
                    <p className="text-blue-700">
                      Donations are voluntary contributions and are generally
                      non-refundable unless there is evidence of fraud or
                      misrepresentation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Donation Terms</h4>
                      <ul className="text-sm space-y-1">
                        <li>• All donations are final</li>
                        <li>• No guarantee campaigns will reach goals</li>
                        <li>• Donors receive email confirmations</li>
                        <li>• Tax receipts available upon request</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Platform Fees</h4>
                      <ul className="text-sm space-y-1">
                        {/* <li>• 3% platform fee on successful campaigns</li> */}
                        <li>• Payment processing fees apply</li>
                        <li>• Fees clearly displayed before donation</li>
                        <li>• No hidden charges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 5: Withdrawals */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">5. Withdrawals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    Campaign organizers can withdraw funds subject to the
                    following conditions:
                  </p>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">
                      Verification Requirements
                    </h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Identity verification must be completed</li>
                      <li>• Bank account verification required</li>
                      <li>• Campaign details may be reviewed</li>
                      <li>• Additional documentation may be requested</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Processing Time</h4>
                      <p className="text-sm text-gray-600">
                        Withdrawals typically process within 3-5 business days
                        after verification is complete.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Hold Periods</h4>
                      <p className="text-sm text-gray-600">
                        We may hold withdrawals for security reviews or
                        compliance checks as needed.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 6: Prohibited Activities */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                  6. Prohibited Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Violation of these prohibitions may result in immediate
                    account termination and legal action.
                  </AlertDescription>
                </Alert>

                <p className="mb-4">You may not use our platform to:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Badge
                      variant="destructive"
                      className="w-full justify-start p-2"
                    >
                      Promote illegal or fraudulent content
                    </Badge>
                    <Badge
                      variant="destructive"
                      className="w-full justify-start p-2"
                    >
                      Impersonate others or misrepresent facts
                    </Badge>
                    <Badge
                      variant="destructive"
                      className="w-full justify-start p-2"
                    >
                      Post harmful or offensive material
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Badge
                      variant="destructive"
                      className="w-full justify-start p-2"
                    >
                      Circumvent platform fees
                    </Badge>
                    <Badge
                      variant="destructive"
                      className="w-full justify-start p-2"
                    >
                      Interfere with platform operations
                    </Badge>
                    <Badge
                      variant="destructive"
                      className="w-full justify-start p-2"
                    >
                      Violate intellectual property rights
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 7: Platform Rights */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">7. Platform Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>GiveACause reserves the right to:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Modify or terminate the platform at any time
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Remove campaigns that violate our guidelines
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Suspend or terminate user accounts
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Update these Terms with reasonable notice
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 8: Intellectual Property */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  8. Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    All content and trademarks on the platform are owned by
                    GiveACause or its licensors. You may not use them without
                    permission.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">User Content</h4>
                    <p className="text-gray-700">
                      By posting content on our platform, you grant us a
                      non-exclusive, worldwide, royalty-free license to use,
                      display, and distribute your content in connection with
                      our services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 9: Disclaimer */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">9. Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    GiveACause is a platform facilitator, not a financial
                    institution or charity.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <p>Important disclaimers:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      We do not provide financial advice
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      We do not guarantee campaign success
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      We are not responsible for disputes between users
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Platform availability is not guaranteed
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Section 10: Limitation of Liability */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  10. Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-red-800">
                    To the extent permitted by law, GiveACause is not liable
                    for:
                  </p>
                  <ul className="mt-2 space-y-1 text-red-700">
                    <li>• Indirect, incidental, or consequential damages</li>
                    <li>• Loss of profits, data, or business opportunities</li>
                    <li>• Acts or omissions of other users or third parties</li>
                    <li>• Technical failures or platform downtime</li>
                  </ul>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Our total liability shall not exceed the amount of fees paid
                  by you in the 12 months preceding the claim.
                </p>
              </CardContent>
            </Card>

            {/* Section 11: Governing Law */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Gavel className="h-6 w-6 text-blue-600 mr-3" />
                  11. Governing Law
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  These Terms are governed by the laws of the jurisdiction where
                  GiveACause is incorporated. Any disputes shall be resolved
                  through binding arbitration or in the courts of competent
                  jurisdiction.
                </p>
                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">
                    Dispute Resolution
                  </h4>
                  <p className="text-blue-700 text-sm">
                    We encourage users to contact us first to resolve any
                    disputes. If informal resolution is not possible, disputes
                    will be resolved through arbitration.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Section 12: Changes to Terms */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  12. Changes to These Terms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  We may update these Terms from time to time. We will notify
                  you of any material changes by posting the new Terms on this
                  page and updating the "Last Updated" date. Your continued use
                  of the platform after such changes constitutes acceptance of
                  the new Terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-8 bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-2xl text-green-800">
                  13. Contact Us
                </CardTitle>
                <CardDescription className="text-green-700">
                  If you have questions about these Terms, please contact us:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-green-700">info@giveacause.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Legal Department</p>
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
