import { Inject, Service } from "typedi"
import { NewUserDto } from "../dtos"
import { UserRepository } from "../repos"
import { CommonService } from "./common.service"

@Service()
export class UserService {
  @Inject()
  private readonly _commonService: CommonService
  @Inject()
  private readonly _userRepo: UserRepository

  async register(user: NewUserDto) {
    const hashedPassword = this._commonService.hashPassword(user.password)
    user.password = hashedPassword

    const result = await this._userRepo.create(user)
    return result
  }
}
