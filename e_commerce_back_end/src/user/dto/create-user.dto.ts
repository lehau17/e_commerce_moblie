import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsString()
    @Min(6)
    password: string
    @IsString()
    @IsNotEmpty()
    full_name: string
    @IsString()
    phone_number: string
    @IsString()
    @IsNotEmpty()
    address: string
    @IsString()
    @IsNotEmpty()
    dob: string
    @IsString()
    @IsNotEmpty()
    gender: string
}
