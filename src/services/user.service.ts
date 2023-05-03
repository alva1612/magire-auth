import { Inject, Service } from "typedi"
import { NewUserDto } from "../dtos"
import { UserRepository } from "../repos"
import { hashPassword } from "../helpers/security.helper"
import { LocalLoginDto } from "../../Login/local-login.dto"

@Service()
export class UserService {
  @Inject()
  private readonly _userRepo: UserRepository

  async getUserByLogin(loginCredentials: LocalLoginDto) {
    const { loginKey } = loginCredentials

    const email = loginKey
    const existingUser = await this._userRepo.getUserByFilter({ email })
    return existingUser
  }

  async register(user: NewUserDto) {
    const hashedPassword = hashPassword(user.password)
    user.password = hashedPassword

    const result = await this._userRepo.create(user)
    return result
  }
}
