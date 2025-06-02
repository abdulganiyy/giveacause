import React from "react";
import { Shield, Clock, Globe } from "lucide-react";

const TrustIndicators = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure & Safe
            </h3>
            <p className="text-gray-600">
              Your donations are protected with bank-level security
            </p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fast Withdrawals
            </h3>
            <p className="text-gray-600">
              Access your funds quickly when you need them most
            </p>
          </div>
          <div className="text-center">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Global Reach
            </h3>
            <p className="text-gray-600">
              Connect with donors from around the world
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
