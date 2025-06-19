import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request,Query } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { QueryCampaignDto } from './dto/query-campaign.dto';


@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createCampaignDto: Omit<CreateCampaignDto,'creatorId'>,@Request() req) {
    // console.log(createCampaignDto,req.user)
    return this.campaignService.create({...createCampaignDto,creatorId:req.user.userId});
  }

  @Get()
  findAll(@Query() query: QueryCampaignDto) {
    return this.campaignService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignService.remove(id);
  }
}
