import { Service } from "typedi"
import { prisma } from "../../lib/prisma"
import { NewUserDto } from "../dtos"
import { User } from "@prisma/client"
import { badImplementation } from "@hapi/boom"

@Service()
export class UserRepository {
  async create(user: NewUserDto) {
    try {
      const result = await prisma.user.create({ data: user })
      return result
    } catch (error) {}
  }

  async getUserByFilter(filter: Partial<User>) {
    const result = await prisma.user.findFirst({ where: filter })
    return result
  }

  // async getUserByFilterOrThrow(filter: Partial<User>) {
  //   const result = this.getUserByFilter(filter)
  //   if (!result) throw new
  // }
}
