"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BasicInfoForm from "./_components/BasicInfo";
import BankInfoForm from "./_components/BankInfo";
// import ValidIDInfoForm from "./_components/ValidIDInfo";
import { fetchUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";

const SettingsPage = () => {
  const { data, isLoading: isLoadingUser } = useUser();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUser(data.userId),
  });

  // console.log(data, user);
  if (isLoadingUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <Skeleton className="h-4 w-20 mb-2" />
                      <Skeleton className="h-8 w-16" />
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="basic" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="basic">Profile</TabsTrigger>
          <TabsTrigger value="bank">Bank Account Details</TabsTrigger>
          {/* <TabsTrigger value="identity">Identity Information</TabsTrigger> */}
        </TabsList>
        <TabsContent value="basic">
          {user && <BasicInfoForm user={user} />}
        </TabsContent>
        <TabsContent value="bank">
          {user && <BankInfoForm user={user} />}
        </TabsContent>
        {/* <TabsContent value="identity">
          <ValidIDInfoForm />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default SettingsPage;
