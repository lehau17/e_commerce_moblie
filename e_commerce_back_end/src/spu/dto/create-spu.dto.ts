// dto/create-spu.dto.ts

import {
  IsInt,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateSpuDto {
  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsString()
  product_name: string;

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
