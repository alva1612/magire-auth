import { Inject, Service } from "typedi"
import { NewUserDto } from "../dtos"
import { UserRepository } from "../repos"
import { hashPassword, isSameHashedString } from "../helpers/security.helper"
import { LocalLoginDto } from "../../Login/local-login.dto"
import { sign } from "jsonwebtoken"
import { ConfigService } from "./config.service"
import { ENV_KEY } from "../constants"

@Service()
export class UserService {
  @Inject()
  private readonly _userRepo: UserRepository
  @Inject()
  private readonly _configService: ConfigService

  async localLogin(loginCredentials: LocalLoginDto) {
    //first search user by id if exists and match passwords, return token and data
    const { loginKey, password } = loginCredentials

    const email = loginKey
    const existingUser = await this._userRepo.getUserByFilter({ email })

    const compare = isSameHashedString(password, existingUser.password)
    //validate if compared
    if (!compare) return

    return {
      ...existingUser,
      token: sign(existingUser, this._configService.get(ENV_KEY.JWT_SECRET), {
        expiresIn: this._configService.get(ENV_KEY.JWT_EXPIRES),
      }),
    }
  }

  async register(user: NewUserDto) {
    const hashedPassword = hashPassword(user.password)
    user.password = hashedPassword

    const result = await this._userRepo.create(user)
    return result
  }
}
