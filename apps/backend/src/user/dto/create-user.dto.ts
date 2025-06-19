import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  bankName?: string;

  @IsOptional()
  @IsString()
  accountName?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  // @IsOptional()
  // @IsString()
  // stripeCustomerId?: string;

  @IsOptional()
  @IsString()
  paystackSubAccountId?: string;

  @IsString()
  roleId: string;
}

