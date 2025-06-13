"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormFactory from "@/components/custom/form-factory";
import type { FieldConfig, FormValues } from "@/types";
import { bankInfoFormSchema } from "@/schema/user";
import apiService from "@/lib/apiService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { banks } from "@/lib/utils";

export const bankInfoFormFields: FieldConfig[] = [
  {
    name: "bankName",
    label: "Bank Name",
    type: "select",
    placeholder: "Select a bank",
    options: banks,
  },
  {
    name: "bankAccountNumber",
    label: "Bank Account Number",
    type: "account-number",
  },
  {
    name: "bankAccountName",
    label: "Bank Account Name",
    type: "text",
  },
  {
    name: "bvn",
    label: "BVN",
    type: "text",
  },
];

export const bankInfoErrorMessages = {
  GENERIC_ERROR: "There was an error updating your information.",
} as const;

export default function BankInfoForm() {
  const [error, setError] = useState<string | null>(null);
  const { GENERIC_ERROR } = bankInfoErrorMessages;

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
    console.log(data);
    // setError(null);
    // mutate({ ...data });
  }

  return (
    <>
      <FormFactory
        fields={bankInfoFormFields}
        schema={bankInfoFormSchema}
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
