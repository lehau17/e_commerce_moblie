import { IsNotEmpty, IsString, Length } from 'class-validator';
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(6)
  password: string;
}
