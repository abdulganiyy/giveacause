import * as yup from "yup";
import { REQUIRED } from "./common-validation";

export const campaignFormSchema = yup.object().shape({
  title: yup.string().required(REQUIRED),
  description: yup.string().required(REQUIRED),
  categoryId: yup.string().required(REQUIRED),
  imageUrl: yup.array().of(
    yup.object().shape({
      url: yup.string().required(REQUIRED),
      filename: yup.string().required(REQUIRED),
      mimeType: yup.string().required(REQUIRED),
    })
  ),
  targetAmount: yup.number().required(REQUIRED),
  deadline: yup.string().required(REQUIRED),
});

export const editCampaignFormSchema = yup.object().shape({
  title: yup.string().optional(),
  description: yup.string().optional(),
  categoryId: yup.string().optional(),
  imageUrl: yup.array().of(
    yup.object().shape({
      url: yup.string().optional(),
      filename: yup.string().optional(),
      mimeType: yup.string().optional(),
    })
  ),
  targetAmount: yup.number().optional(),
  deadline: yup.string().optional(),
});
