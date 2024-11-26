// dto/search-spu.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class SearchSpuDto {
  @IsOptional()
  @IsString()
  product_name?: string;
}
