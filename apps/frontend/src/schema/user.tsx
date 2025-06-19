import * as yup from "yup";
import { REQUIRED } from "./common-validation";
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
  bankAccountName: yup.string().required(REQUIRED),
  bankAccountNumber: yup.string().optional(),
  bvn: yup.string().optional(),
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
