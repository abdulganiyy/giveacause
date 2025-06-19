"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormFactory from "@/components/custom/form-factory";
import type { FieldConfig, FormValues } from "@/types";
import { basicInfoFormSchema } from "@/schema/user";
import apiService from "@/lib/apiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const basicInfoFormFields: FieldConfig[] = [
  {
    name: "firstname",
    label: "First Name",
    type: "text",
    // placeholder: "Enter First Name",
  },
  {
    name: "lastname",
    label: "Last Name",
    type: "text",
  },
  {
    name: "username",
    label: "User Name",
    type: "text",
  },
  {
    name: "address",
    label: "Address",
    type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
  },
];

export const basicInfoErrorMessages = {
  GENERIC_ERROR: "There was an error updating your information.",
} as const;

export default function BasicInfoForm({ user }: { user: any }) {
  const [error, setError] = useState<string | null>(null);
  const { GENERIC_ERROR } = basicInfoErrorMessages;

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiService.patch(`/user`, payload);

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
    setError(null);
    mutate({ ...data });
  }

  return (
    <>
      <FormFactory
        fields={basicInfoFormFields}
        schema={basicInfoFormSchema}
        formWrapperClassName="w-full flex flex-col"
        formFieldElClass="w-full"
        onSubmit={handleUpdateInfo}
        defaultValues={{
          username: user?.username,
          firstname: user?.firstname,
          lastname: user?.lastname,
        }}
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
