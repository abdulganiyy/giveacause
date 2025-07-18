import { Injectable ,NotFoundException,Logger, HttpException, HttpStatus} from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from 'src/prisma.service';
import { CampaignService } from 'src/campaign/campaign.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class DonationService {
    private readonly logger = new Logger(DonationService.name);

  
      constructor(private prisma: PrismaService,private campaignService:CampaignService, private emailService:EmailService) {}
  
 create(createDonationDto: CreateDonationDto) {
    // return this.prisma.donation.create({data:createDonationDto})
        return this.prisma.$transaction(async (tx) => {

            try {
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

  await this.emailService.sendEmail(createDonationDto.email as string,
    'Thank You for Your Donation',
    'donation-confirmation',
    {
    amount:createDonationDto.amount.toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    }),  
    appName:process.env.APPNAME,
    campaignTitle:campaign.title,
    campaignLink:`${process.env.FRONTEND_URL}/campaigns` 
    });
    this.logger.log(`Donation sent successfully`)

      return donation;
    } catch (error) {
      this.logger.error(`Error sending donation: ${error.message}`);

      throw new HttpException(`Error sending donation: ${error.message}`,HttpStatus.BAD_REQUEST)
    }
   
    })
  }

  findAll() {
    return this.prisma.donation.findMany();
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
