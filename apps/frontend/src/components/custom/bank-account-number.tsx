import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { debounce } from "lodash";

import { banks } from "@/lib/utils";

export function BankAccountInput({
  name,
  rhfField,
}: {
  name: string;
  rhfField: any;
}) {
  const {
    register,
    setValue,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = useFormContext();

  const accountNumber = watch(name);
  //   console.log(accountNumber);

  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      account_number,
      bank_code,
    }: {
      account_number: string;
      bank_code: string;
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/paystack/verify-account?accountNumber=${account_number}&bankCode=${bank_code}`
      );

      if (!res.ok) throw new Error("Invalid account details");
      return res.json();
    },
    onSuccess: (data) => {
      console.log(data);
      setValue("bankAccountName", data.data.account_name);
    },
    onError: () => {
      setValue("bankAccountName", "");
      setError("bankAccountName", {
        type: "value",
        message: "Invalid account number",
      });
      //   toast.error("Unable to verify account. Check details.");
    },
  });

  const debouncedVerify = debounce((acc: string, bank: string) => {
    if (acc.length === 10 && bank) {
      mutate({ account_number: acc, bank_code: bank });
    }
  }, 600);

  useEffect(() => {
    const bankCode = banks.find(
      (bank) => bank.value == getValues("bankName")
    )?.value;

    // console.log(getValues("bankName"), accountNumber, bankCode);

    if (accountNumber && bankCode) {
      debouncedVerify(accountNumber, bankCode);
    }
    return () => debouncedVerify.cancel();
  }, [accountNumber]);

  return (
    <Input
      {...rhfField}
      placeholder="0123456789"
      maxLength={10}
      className="max-h-9"
    />
  );
}
