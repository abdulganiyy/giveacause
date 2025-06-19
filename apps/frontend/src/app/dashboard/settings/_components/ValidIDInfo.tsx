"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormFactory from "@/components/custom/form-factory";
import type { FieldConfig, FormValues } from "@/types";
import { validIDInfoFormSchema } from "@/schema/user";
import apiService from "@/lib/apiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const validIDInfoFormFields: FieldConfig[] = [
  {
    name: "id",
    label: "Valid ID Document",
    type: "files",
    fileUploadOptions: {
      maxFiles: 1,
      maxSize: 1024 * 1024,
      accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    },
  },
  {
    name: "address",
    label: "Proof Of Address",
    type: "files",
    fileUploadOptions: {
      maxFiles: 1,
      maxSize: 1024 * 1024,
      accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    },
  },
  {
    name: "other",
    label: "Other Document",
    type: "files",
    fileUploadOptions: {
      maxFiles: 1,
      maxSize: 1024 * 1024,
      accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    },
  },
];

export const basicInfoErrorMessages = {
  GENERIC_ERROR: "There was an error updating your information.",
} as const;

export default function ValidIDInfoForm() {
  const [error, setError] = useState<string | null>(null);
  const { GENERIC_ERROR } = basicInfoErrorMessages;

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiService.patch(`/document`, payload);

      return response.data;
    },
    onSuccess: (data) => {
      toast("Data updated succssfully");
    },
    onError: (err: any) => {
      toast.error(GENERIC_ERROR);
    },
  });

  async function handleUpdateInfo(data: FormValues | any): Promise<void> {
    console.log(data);
    // setError(null);
    // mutate({ ...data });
  }

  return (
    <>
      <FormFactory
        fields={validIDInfoFormFields}
        schema={validIDInfoFormSchema}
        formWrapperClassName="w-full flex flex-col"
        formFieldElClass="w-full"
        onSubmit={handleUpdateInfo}
        actionButtonsComponent={
          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-black text-white"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>

            {error ? <Label className="text-destructive">{error}</Label> : null}
          </div>
        }
      />
    </>
  );
}
