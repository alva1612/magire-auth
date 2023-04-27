import { Inject, Service } from "typedi"
import { NewUserDto } from "../../modules/registration/dtos/new-user.dto"
import { UserRepository } from "../repos"
import { hashSync } from "bcrypt"

@Service()
export class UserService {
  @Inject()
  userRepo: UserRepository

  async create(user: NewUserDto) {
    const hashedPassword = hashSync(user.password)
    const result = await this.userRepo.create(user)
    return result
  }
}
