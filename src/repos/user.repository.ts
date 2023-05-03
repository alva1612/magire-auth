import { Service } from "typedi"
import { prisma } from "../../lib/prisma"
import { NewUserDto } from "../dtos"
import { User } from "@prisma/client"

@Service()
export class UserRepository {
  async create(user: NewUserDto) {
    const result = await prisma.user.create({ data: user })
    return result
  }

  async getUserByFilter(filter: Partial<User>) {
    const result = await prisma.user.findFirstOrThrow({ where: filter })
    return result
  }

  // async getUserByFilterOrThrow(filter: Partial<User>) {
  //   const result = this.getUserByFilter(filter)
  //   if (!result) throw new
  // }
}
