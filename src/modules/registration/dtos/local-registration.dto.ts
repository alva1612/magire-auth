import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LocalRegistrationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
  @IsString()
  @IsNotEmpty()
  username: string
  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  phoneCountry: string
  @IsString()
  @IsNotEmpty()
  phone: string
}
