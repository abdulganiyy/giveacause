"use client";
import { useState } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { fetchCategories } from "@/lib/api";

export const createCampaignErrorMessages = {
  GENERIC_ERROR: "There was an error creating a campaign.",
} as const;

export default function CreateCampaignModal() {
  const [error, setError] = useState<string | null>(null);
  const { GENERIC_ERROR } = createCampaignErrorMessages;
  const [isOpen, setIsOpen] = useState(false); // Track dialog open state

  const {
    data,
    isLoading,
    error: categoriesError,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const campaignFormFields: FieldConfig[] = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter campaign title",
    },
    {
      name: "categoryId",
      label: "Category",
      type: "select",
      options: data?.map((category: any) => ({
        label: category?.name,
        value: category?.id,
      })),
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
      placeholder: "Enter amount to raise in naira",
    },
    {
      name: "deadline",
      label: "Campaign Deadline",
      type: "date",
      placeholder: "Enter due date to raise the amount",
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiService.post(`/campaign`, payload);

      return response.data;
    },
    onSuccess: (data) => {
      toast("Campaign created succssfully");
      setIsOpen(false); // Close modal on success
    },
    onError: (err: any) => {
      toast.error(GENERIC_ERROR);
    },
  });

  async function handleCreateCampaign(data: FormValues | any): Promise<void> {
    setError(null);
    mutate({ ...data, imageUrl: data.imageUrl[0].url, currency: "₦" });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Campaign
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
                className="bg-green-600 hover:bg-green-700"
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
