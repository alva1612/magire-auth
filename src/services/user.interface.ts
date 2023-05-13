import { User } from "@prisma/client"
import { LocalLoginDto } from "../../Login/local-login.dto"
import { NewUserDto } from "../dtos"

export interface IUserService {
  getUserByLogin(loginCredentials: LocalLoginDto): Promise<User>
  register(user: NewUserDto): Promise<User>
}
