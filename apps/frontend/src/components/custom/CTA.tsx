import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
          Ready to Start Your Campaign?
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Join thousands of people who have successfully raised money for their
          causes. It only takes a few minutes to get started.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signin">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Your Campaign
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
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
  );
};

export default CTA;
