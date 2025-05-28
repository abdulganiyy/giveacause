import * as yup from "yup";
import { REQUIRED } from "./common-validation";

export const campaignFormSchema = yup.object().shape({
  title: yup.string().required(REQUIRED),
  description: yup.string().required(REQUIRED),
});
