// dto/create-shop.dto.ts

import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateShopDto {
  @IsString()
  shop_name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  website_url?: string;

  @IsOptional()
  @IsUrl()
  logo_url?: string;
}
