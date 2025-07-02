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
import { editUserFormSchema } from "@/schema/user";
import apiService from "@/lib/apiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { fetchRoles } from "@/lib/api";

export const createUserErrorMessages = {
  GENERIC_ERROR: "There was an error updating user details",
} as const;

export default function EditUserModal({ user }: any) {
  const [error, setError] = useState<string | null>(null);
  const { GENERIC_ERROR } = createUserErrorMessages;
  const [isOpen, setIsOpen] = useState(false); // Track dialog open state

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchRoles,
  });

  const editUserFormFields: FieldConfig[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "firstname",
      label: "First Name",
      type: "text",
      placeholder: "Enter your First Name",
    },
    {
      name: "lastname",
      label: "Last Name",
      type: "text",
      placeholder: "Enter your Last Name",
    },
    {
      name: "roleId",
      label: "Role",
      type: "select",
      options: roles?.map((role: any) => ({
        label: role?.name,
        value: role?.id,
      })),
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await apiService.patch(`/user/${user?.id}`, payload);

      return response.data;
    },
    onSuccess: (data) => {
      toast("User updated successfully");
      setIsOpen(false); // Close modal on success
    },
    onError: (err: any) => {
      toast.error(GENERIC_ERROR);
    },
  });

  async function handleEditUser(data: FormValues | any): Promise<void> {
    console.log(data);
    setError(null);
    mutate({ ...data });
  }

  //   console.log(user);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)} variant="ghost">
          <Plus className="mr-2 h-4 w-4" />
          Edit User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <FormFactory
          fields={editUserFormFields}
          schema={editUserFormSchema}
          defaultValues={{
            email: user?.email,
            firstname: user?.firstname,
            lastname: user?.lastname,
          }}
          formWrapperClassName="w-full flex flex-col"
          formFieldElClass="w-full"
          onSubmit={handleEditUser}
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
