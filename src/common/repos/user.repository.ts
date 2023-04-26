import { Service } from "typedi"
import { prisma } from "../../../lib/prisma"
import { NewUserDto } from "../../modules/registration/dtos/new-user.dto"

@Service()
export class UserRepository {
  async create(user: NewUserDto) {
    const result = await prisma.user.create({ data: user })
    return result
  }
}
