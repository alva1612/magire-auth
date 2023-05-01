import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LocalLoginDto {
  @IsString()
  @IsNotEmpty()
  loginKey: string

  @IsString()
  @IsNotEmpty()
  password: string
}
