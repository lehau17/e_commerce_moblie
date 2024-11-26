import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateShippingAddressDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  user_received: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 256)
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 20)
  @Matches(/^[0-9]+$/, { message: 'Phone number should contain only digits' })
  phone: string;
}
