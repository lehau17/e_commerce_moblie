// dto/update-spu.dto.ts

import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSpuDto {
  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsString()
  spu_code?: string;

  @IsOptional()
  @IsInt()
  product_status?: number;

  @IsOptional()
  @IsInt()
  product_shop?: number;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;

  @IsOptional()
  @IsInt()
  sort?: number;
}
