// dto/search-shop.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class SearchShopDto {
  @IsOptional()
  @IsString()
  shop_name?: string;
}
