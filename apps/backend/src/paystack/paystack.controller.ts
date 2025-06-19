import { Controller, Get, Post, Body, Patch, Param, Delete,Query } from '@nestjs/common';
import { PaystackService } from './paystack.service';


@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Get('verify-account')
  async verifyAccount(
     @Query('accountNumber') accountNumber: string,
    @Query('bankCode') bankCode: string,
  ) {
    return this.paystackService.verifyBankAccount(accountNumber,bankCode)
  }
}
