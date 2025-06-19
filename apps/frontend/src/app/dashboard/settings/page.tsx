"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoForm from "./_components/BasicInfo";
import BankInfoForm from "./_components/BankInfo";
// import ValidIDInfoForm from "./_components/ValidIDInfo";
import { fetchUser } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";

const SettingsPage = () => {
  const { data } = useUser();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: () => fetchUser(data.userId),
  });

  console.log(data, user);
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
