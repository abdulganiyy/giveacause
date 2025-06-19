import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { PrismaService } from 'src/prisma.service';
import { CampaignModule } from 'src/campaign/campaign.module';

@Module({
  imports:[CampaignModule],
  controllers: [DonationController],
  providers: [DonationService,PrismaService],
})
export class DonationModule {}
