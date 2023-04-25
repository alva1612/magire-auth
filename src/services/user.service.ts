import { Inject, Service } from "typedi"
import { NewUserDto } from "../dtos/registration/new-user.dto"
import { UserRepository } from "../repos"

@Service()
export class UserService {
  @Inject()
  userRepo: UserRepository

  create(user: NewUserDto) {
    this.userRepo.create(user)
  }
}
