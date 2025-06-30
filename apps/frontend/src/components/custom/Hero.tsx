import Link from "next/link";
import Image from "next/image";
import {
  Users,
  DollarSign,
  Award,
  ArrowRight,
  TrendingUp,
  Play,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Stats from "./Stats";

export default function Hero() {
  return (
    <>
      <section className="relative bg-gradient-to-br from-green-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  #1 Trusted Fundraising Platform
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Turn Your
                  <span className="text-green-600"> Dreams </span>
                  Into Reality
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join millions of people who have raised money for the things
                  that matter to them most. Start your fundraising campaign
                  today and make a difference.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3"
                  >
                    Start Fundraising
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                {/* <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch How It Works
                </Button> */}
              </div>
              {/* <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$2.4M+</div>
                  <div className="text-sm text-gray-600">Raised</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">15K+</div>
                  <div className="text-sm text-gray-600">Donors</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">1.2K+</div>
                  <div className="text-sm text-gray-600">Campaigns</div>
                </div>
              </div> */}
            </div>
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop&crop=center"
                  alt="People helping each other"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-blue-200 rounded-full opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <Stats /> */}
    </>
  );
}
