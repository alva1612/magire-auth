import { Service } from "typedi"
import { prisma } from "../../lib/prisma"
import { NewUserDto } from "../dtos/registration/new-user.dto"

@Service()
export class UserRepository {
  create(user: NewUserDto) {
    console.log("funciona", user)
  }
}
