import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class LocalRegistrationDto {
  @IsEmail()
  email: string
  @IsString()
  username: string
  @IsStrongPassword()
  password: string

  @IsString()
  phoneCountry: string
  @IsString()
  phone: string
}
