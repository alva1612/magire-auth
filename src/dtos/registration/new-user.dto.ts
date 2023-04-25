import { IsEmail, IsString, IsStrongPassword } from "class-validator"

export class NewUserDto {
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
