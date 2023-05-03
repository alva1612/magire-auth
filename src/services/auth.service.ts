import { Service } from "typedi"
import { ConfigService } from "./config.service"
import { User } from "@prisma/client"
import { isSameHashedString } from "../helpers/security.helper"
import { ENV_KEY } from "../constants"
import { plainToInstance } from "class-transformer"
import { UserResponseDto } from "../dtos/response-safe"
import { sign } from "jsonwebtoken"
import { LoginResponseDto } from "../dtos/response-safe/user-response.dto"

@Service()
export class AuthService {
  private readonly JWT_SECRET
  private readonly JWT_EXPIRES

  constructor(private readonly _configService: ConfigService) {
    this.JWT_SECRET = this._configService.get(ENV_KEY.JWT_SECRET)
    this.JWT_EXPIRES = this._configService.get(ENV_KEY.JWT_EXPIRES)
  }

  async localLogin(password: string, user: User) {
    const compare = isSameHashedString(password, user.password)
    if (!compare) return

    const responseUser = plainToInstance(UserResponseDto, user)
    const token = this.signToken(responseUser)

    const response: LoginResponseDto = {
      ...responseUser,
      token,
    }
    return response
  }

  private signToken(user: UserResponseDto) {
    const token = sign({ ...user }, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES,
    })
    return token
  }
}
