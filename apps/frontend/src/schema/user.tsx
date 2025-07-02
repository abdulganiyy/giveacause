import * as yup from "yup";
import { REQUIRED, INVALID_EMAIL } from "./common-validation";
import { validIDInfoFormFields } from "@/app/dashboard/settings/_components/ValidIDInfo";

export const basicInfoFormSchema = yup.object().shape({
  firstname: yup.string().required(REQUIRED),
  lastname: yup.string().required(REQUIRED),
  username: yup.string().optional(),
  address: yup.string().optional(),
  phone: yup.string().optional(),
});

export const bankInfoFormSchema = yup.object().shape({
  bankName: yup.string().required(REQUIRED),
  accountName: yup.string().required(REQUIRED),
  accountNumber: yup.string().required(REQUIRED),
  // bvn: yup.string().optional(),
});

export const validIDInfoFormSchema = yup.object().shape({
  id: yup.array().of(
    yup.object().shape({
      url: yup.string().required(REQUIRED),
      filename: yup.string().required(REQUIRED),
      mimeType: yup.string().required(REQUIRED),
    })
  ),
  address: yup.array().of(
    yup.object().shape({
      url: yup.string().required(REQUIRED),
      filename: yup.string().required(REQUIRED),
      mimeType: yup.string().required(REQUIRED),
    })
  ),
  other: yup.array().of(
    yup.object().shape({
      url: yup.string().required(REQUIRED),
      filename: yup.string().required(REQUIRED),
      mimeType: yup.string().required(REQUIRED),
    })
  ),
});

export const createUserFormSchema = yup.object().shape({
  email: yup.string().email().required(INVALID_EMAIL),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  roleId: yup.string().required(),
  password: yup.string().required("Password is required"),
});

export const editUserFormSchema = yup.object().shape({
  email: yup.string().email().required(INVALID_EMAIL),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  roleId: yup.string().required(),
  password: yup.string().optional(),
});
