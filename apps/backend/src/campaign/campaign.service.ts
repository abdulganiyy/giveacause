import { Injectable } from '@nestjs/common';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/prisma.service';
import { QueryCampaignDto } from './dto/query-campaign.dto';

@Injectable()
export class CampaignService {

  constructor(private prisma: PrismaService){}

  create(data: CreateCampaignDto) {
    return this.prisma.campaign.create({data})
  }

  async findAll(query:QueryCampaignDto) {
    // return this.prisma.campaign.findMany()
    console.log(query)
      const {
      search,
      isActive,
      category,
      featured,
      trending,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const where: any = {
    };

    if(isActive == "true"){
      where.isActive = true
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.categoryId = category;
    }

    if (featured !== undefined) {
      where.featured = featured === 'true';
    }

      if (trending !== undefined) {
      where.trending = trending === 'true';
    }


    const [data, total] = await this.prisma.$transaction([
      this.prisma.campaign.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip: (page - 1) * limit,
        take: limit,
          include: {
        _count: {
          select: {
            donations: true,
          },
         
        },
         creator:true,
         category:true,
         donations:true
      },
      }),
      this.prisma.campaign.count({ where }),
    ])

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
  


  findOne(id: string) {
    return this.prisma.campaign.findFirst({where:{id},include:{donations:true,creator:true,category:true}})
  }

  update(id: string, updateCampaignDto: UpdateCampaignDto) {
    return this.prisma.campaign.update({where:{id},data:updateCampaignDto})
  }

  remove(id: string) {
    return this.prisma.campaign.delete({where:{id}})
  }
}
