"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Users,
  Shield,
  Globe,
  Award,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from "@/components/custom/NavBar";
import Footer from "@/components/custom/Footer";

const stats = [
  { label: "Total Raised", value: "$2.4M+", icon: TrendingUp },
  { label: "Active Campaigns", value: "1,247", icon: Heart },
  { label: "Happy Donors", value: "15,000+", icon: Users },
  { label: "Success Stories", value: "892", icon: Award },
];

const values = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Compassion First",
    description:
      "We believe in the power of human kindness and the importance of helping those in need.",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Trust & Transparency",
    description:
      "Every donation is tracked, and campaign organizers provide regular updates on fund usage.",
  },
  {
    icon: <Globe className="h-8 w-8 text-green-500" />,
    title: "Global Impact",
    description:
      "Connecting donors worldwide with causes that matter, creating positive change everywhere.",
  },
  {
    icon: <Users className="h-8 w-8 text-purple-500" />,
    title: "Community Driven",
    description:
      "Our platform is built by the community, for the community, fostering connections and support.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    bio: "Former nonprofit director with 15+ years of experience in fundraising and community development.",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    bio: "Tech entrepreneur passionate about using technology to solve social problems and create positive impact.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Community",
    bio: "Community organizer and social worker dedicated to connecting people with the resources they need.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
  },
  {
    name: "David Thompson",
    role: "Head of Security",
    bio: "Cybersecurity expert ensuring the safety and privacy of all user data and financial transactions.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
  },
];

const milestones = [
  {
    year: "2020",
    title: "FundHope Founded",
    description:
      "Started with a simple mission: make fundraising accessible to everyone.",
  },
  {
    year: "2021",
    title: "First Million Raised",
    description:
      "Reached our first major milestone with over $1M raised for various causes.",
  },
  {
    year: "2022",
    title: "Global Expansion",
    description:
      "Expanded to serve communities in over 25 countries worldwide.",
  },
  {
    year: "2023",
    title: "Platform Innovation",
    description:
      "Launched advanced features including AI-powered campaign optimization and mobile app.",
  },
  {
    year: "2024",
    title: "Community Growth",
    description:
      "Reached 15,000+ active donors and 1,000+ successful campaigns.",
  },
];

const features = [
  {
    title: "Easy Campaign Creation",
    description:
      "Create compelling fundraising campaigns in minutes with our intuitive tools.",
  },
  {
    title: "Secure Payments",
    description:
      "Bank-level security ensures all donations and withdrawals are safe and protected.",
  },
  {
    title: "Real-time Updates",
    description:
      "Keep donors engaged with automatic updates and progress notifications.",
  },
  {
    title: "Global Reach",
    description:
      "Connect with donors from around the world and accept multiple currencies.",
  },
  {
    title: "Mobile Optimized",
    description:
      "Fully responsive design works perfectly on all devices and screen sizes.",
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is always here to help you succeed.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-green-100 text-green-800 border-green-200 mb-6">
              About GiveACause
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Empowering Dreams,
              <span className="text-green-600"> One Campaign </span>
              at a Time
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {/* Since 2020,  */}
              GiveACause has been the trusted platform connecting generous
              hearts with meaningful causes. We believe that everyone deserves
              the chance to turn their dreams into reality, and every cause
              deserves support from a caring community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/campaigns">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Browse Campaigns
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600">
              See how we're making a difference together
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At GiveACause, we're on a mission to democratize fundraising and
                make it possible for anyone, anywhere, to raise money for the
                causes they care about most. We believe that when people come
                together with a shared purpose, incredible things can happen.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Whether it's helping a family in crisis, supporting a local
                community project, funding medical treatments, or backing
                innovative ideas, we provide the tools and platform to turn
                compassion into action.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">
                    Transparent and secure fundraising platform
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">
                    Global community of donors and supporters
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">
                    Dedicated support for campaign success
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=500&fit=crop&crop=center"
                alt="People helping each other"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">892</div>
                    <div className="text-sm text-gray-600">Success Stories</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our
              community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a simple idea to a global platform making real impact
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div
                    className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Badge className="bg-green-100 text-green-800 mb-3">
                          {milestone.year}
                        </Badge>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-green-600 rounded-full">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind FundHope, dedicated to making
              fundraising accessible to everyone
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={120}
                      height={120}
                      className="rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FundHope?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We've built the most comprehensive and user-friendly fundraising
              platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of people who have successfully raised money for
            their causes or supported others in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Your Campaign
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/campaigns">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-green-600"
              >
                Browse Campaigns
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
