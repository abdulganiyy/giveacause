import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';
import { PaystackModule } from 'src/paystack/paystack.module';

@Module({
  imports:[PaystackModule],
  controllers: [UserController],
  providers: [UserService,PrismaService,EmailService],
  exports:[UserService]
})
export class UserModule {}
