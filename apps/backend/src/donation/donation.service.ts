import { Injectable ,NotFoundException} from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from 'src/prisma.service';
import { CampaignService } from 'src/campaign/campaign.service';

@Injectable()
export class DonationService {
      constructor(private prisma: PrismaService,private campaignService:CampaignService) {}
  
 create(createDonationDto: CreateDonationDto) {
    // return this.prisma.donation.create({data:createDonationDto})
        return this.prisma.$transaction(async (tx) => {
      const campaign = await tx.campaign.findUnique({
        where: { id: createDonationDto.campaignId },
      });

      if (!campaign) {
        throw new NotFoundException('Campaign not found');
      }

      // Step 2: Update amountRaised
      await tx.campaign.update({
        where: { id: campaign.id },
        data: {
          currentAmount: {
            increment: createDonationDto.amount,
          },
        },
      });

      // Step 3: Create the donation
      const donation = await tx.donation.create({ data:createDonationDto });

      return donation;
    });
  }

  findAll() {
    return `This action returns all donation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }

  update(id: number, updateDonationDto: UpdateDonationDto) {
    return `This action updates a #${id} donation`;
  }

  remove(id: number) {
    return `This action removes a #${id} donation`;
  }
}
