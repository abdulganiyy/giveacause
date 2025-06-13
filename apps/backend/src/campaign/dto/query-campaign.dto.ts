import { IsOptional, IsString, IsBooleanString, IsNumberString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryCampaignDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBooleanString()
  featured?: string;

  @IsOptional()
  @IsBooleanString()
  trending?: string;

  @IsOptional()
  @IsIn(['createdAt', 'currentAmount','deadline'])
  sortBy?: 'createdAt' |  'currentAmount'|'deadline' ;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumberString()
  limit?: number;
}
