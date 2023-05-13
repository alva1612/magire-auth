import { User } from "@prisma/client"
import { LoginResponseDto } from "../dtos/response-safe/user-response.dto"

export interface IAuthService {
  localLogin(user: User): Promise<LoginResponseDto>
}
