import React from "react";

const howItWorksSteps = [
  {
    step: "1",
    title: "Start Your Campaign",
    description:
      "Create your fundraising campaign in minutes with our easy-to-use tools.",
    icon: "🚀",
  },
  {
    step: "2",
    title: "Share Your Story",
    description:
      "Tell your story with photos and updates to connect with potential donors.",
    icon: "📖",
  },
  {
    step: "3",
    title: "Receive Donations",
    description:
      "Get donations from friends, family, and generous strangers worldwide.",
    icon: "💝",
  },
  {
    step: "4",
    title: "Reach Your Goal",
    description:
      "Use the funds to make a real difference in your life or cause.",
    icon: "🎯",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How FundHope Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to launch your
            campaign
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {howItWorksSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
