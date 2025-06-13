import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { EmailService } from './email/email.service';
import { CampaignModule } from './campaign/campaign.module';
import { CategoryModule } from './category/category.module';
import { DonationModule } from './donation/donation.module';


@Module({
  imports: [UserModule, AuthModule, RoleModule, CampaignModule, CategoryModule, DonationModule],
  controllers: [AppController],
  providers: [AppService, EmailService]
})
export class AppModule {}
