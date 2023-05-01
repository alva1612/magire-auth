import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LocalLoginDto {
  @IsString()
  @IsNotEmpty()
  loginKey

  @IsString()
  @IsNotEmpty()
  password: string
}
