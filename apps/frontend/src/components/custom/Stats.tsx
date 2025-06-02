import React from "react";
import { Users, DollarSign, Award, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Raised", value: "$2.4M", icon: DollarSign },
  { label: "Active Campaigns", value: "1,247", icon: TrendingUp },
  { label: "Happy Donors", value: "15,000+", icon: Users },
  { label: "Success Stories", value: "892", icon: Award },
];

const Stats = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <stat.icon className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
