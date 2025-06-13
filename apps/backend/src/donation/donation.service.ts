import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DonationService {
      constructor(private prisma: PrismaService) {}
  
  create(createDonationDto: CreateDonationDto) {
    return this.prisma.donation.create({data:createDonationDto})
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
