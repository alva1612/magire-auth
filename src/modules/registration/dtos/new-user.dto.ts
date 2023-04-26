import { IsEmail, IsString } from "class-validator"

export class NewUserDto {
  @IsEmail()
  email: string
  @IsString()
  username: string
  @IsString()
  password: string
  @IsString()
  phoneCountry: string
  @IsString()
  phone: string
}
