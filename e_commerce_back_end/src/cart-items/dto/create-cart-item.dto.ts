import { IsInt, IsNotEmpty } from 'class-validator';

// create-cart-item.dto.ts
export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  sku_id: number;
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
