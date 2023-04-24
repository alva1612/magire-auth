import { HttpHandler, HttpResponseInit } from "@azure/functions"
import { prisma } from "../../lib/prisma"

export const createUser: HttpHandler = async (): Promise<HttpResponseInit> => {
  let newUser
  try {
    newUser = await prisma.user.create({
      data: {
        username: "Alvaro",
        email: "alvaro.guillenc1612@gmail.com",
        password: "Delfosti123@",
        phone: "947540679",
        phone_country: "+51",
      },
    })
  } catch (error) {
    console.log(error)
  }

  return {
    status: 200,
    jsonBody: newUser,
  }
}
