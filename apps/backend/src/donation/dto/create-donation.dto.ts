import { IsString, IsOptional, IsNumber, IsUUID, IsBoolean, IsEmail, IsEnum } from 'class-validator';
import { DonationStatus } from '@prisma/client';

export class CreateDonationDto {
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  anonymous?: boolean;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsUUID()
  campaignId: string;

  @IsOptional()
  @IsEnum(DonationStatus)
  status?: DonationStatus;
}

