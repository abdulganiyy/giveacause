import * as yup from "yup";
import { REQUIRED } from "./common-validation";

export const basicInfoFormSchema = yup.object().shape({
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
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
