import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaystackService {
    private readonly PAYSTACK_BASE_URL = 'https://api.paystack.co';
  private readonly PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

  async verifyBankAccount(accountNumber: string, bankCode: string) {
    const url = `${this.PAYSTACK_BASE_URL}/bank/resolve`;
    try {
      const response = await axios.get(url, {
        params: {
          account_number: accountNumber,
          bank_code: bankCode,
        },
        headers: {
          Authorization: `Bearer ${this.PAYSTACK_SECRET}`,
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      if (!data.status) {
        throw new HttpException(data.message, HttpStatus.BAD_REQUEST);
      }

      return {
        account_number: data.data.account_number,
        account_name: data.data.account_name,
        bankCode,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || 'Bank account verification failed';
      throw new HttpException(message, HttpStatus.BAD_REQUEST)
    }
  }
}
