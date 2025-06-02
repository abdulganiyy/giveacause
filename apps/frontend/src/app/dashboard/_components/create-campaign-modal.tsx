"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import FormFactory from "@/components/custom/form-factory";
import type { FieldConfig, FormValues } from "@/types";
import { campaignFormSchema } from "@/schema/donation";
import apiService from "@/lib/apiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
// import axios from "axios";
// import { values } from "lodash";

export const campaignFormFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: "text",
    placeholder: "Enter campaign title",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter campaign description",
  },
  {
    name: "imageUrl",
    label: "Campaign Image",
    type: "files",
    fileUploadOptions: {
      maxFiles: 1,
      maxSize: 1024 * 1024,
      accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    },
  },
  {
    name: "targetAmount",
    label: "Amount",
    type: "number",
    placeholder: "Enter amount to raise",
  },
  {
    name: "deadline",
    label: "Campaign Deadline",
    type: "date",
    placeholder: "Enter due date to raise the amount",
  },
];

export const createCampaignErrorMessages = {
  GENERIC_ERROR: "There was an error creating a campaign.",
} as const;

export default function CreateCampaignModal() {
  const [error, setError] = useState<string | null>(null);
  const { GENERIC_ERROR } = createCampaignErrorMessages;

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiService.post(`/campaign`, payload);

      return response.data;
    },
    onSuccess: (data) => {
      toast("Campaign created succssfully");
    },
    onError: (err: any) => {
      toast.error(GENERIC_ERROR);
    },
  });

  async function handleCreateCampaign(data: FormValues | any): Promise<void> {
    setError(null);
    mutate({ ...data, imageUrl: data.imageUrl[0].url, currency: "₦" });

    // console.log(data);

    // const { confirmPassword, role, picture, ...payload } = data;

    // try {
    //   await apiService.post("/user", {
    //     ...payload,
    //     roleId: role,
    //     profilePictureId: picture.id,
    //   });

    //   setIsSubmitting(false);
    //   toast({ description: "New user has been successfully created" });
    // } catch (error: any) {
    //   setError(GENERIC_ERROR);
    //   setIsSubmitting(false);
    //   toast({ variant: "destructive", description: error.message });
    // }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black text-white">Add New Campaign</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Campaign</DialogTitle>
        </DialogHeader>
        <FormFactory
          fields={campaignFormFields}
          schema={campaignFormSchema}
          formWrapperClassName="w-full flex flex-col"
          formFieldElClass="w-full"
          onSubmit={handleCreateCampaign}
          actionButtonsComponent={
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-black text-white"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>

              {error ? (
                <Label className="text-destructive">{error}</Label>
              ) : null}
            </div>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
