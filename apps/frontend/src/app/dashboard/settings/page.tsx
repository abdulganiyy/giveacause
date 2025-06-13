import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoForm from "./_components/BasicInfo";
import BankInfoForm from "./_components/BankInfo";

const SettingsPage = () => {
  return (
    <div>
      <Tabs defaultValue="basic" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="basic">Profile</TabsTrigger>
          <TabsTrigger value="bank">Bank Account Details</TabsTrigger>
        </TabsList>
        <TabsContent value="basic">
          <BasicInfoForm />
        </TabsContent>
        <TabsContent value="bank">
          <BankInfoForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
