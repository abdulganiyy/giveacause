import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Campaigns = () => {
  return (
    <div className="py-10 px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        Trending Projects
      </h2>
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="md:basis-1/3">
            <div className="keen-slider__slide">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <img
                  src={"/children.jpg"}
                  alt={"Children"}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Support Earthquake Victims in Nepal
                  </h3>
                  <p className="text-sm text-gray-600">
                    Raised <span className="font-medium">$25,000</span> of
                    $40,000
                    <span className="font-medium">{""}</span>
                  </p>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (parseFloat("$25,000".replace("$", "")) /
                            parseFloat("$40,000".replace("$", ""))) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Campaigns;
