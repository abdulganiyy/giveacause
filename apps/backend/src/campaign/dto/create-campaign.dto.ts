export class CreateCampaignDto {

  title: string;

  description: string;

  imageUrl?: string;

  targetAmount: number;

  currency: string;

  deadline: Date;

  categoryId?: string;

  creatorId: string;
}
