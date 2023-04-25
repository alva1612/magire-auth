import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { NewUserDto } from "../src/dtos/registration/new-user.dto"
import { UserService } from "../src/services"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const userService = Container.get(UserService)
  const test: NewUserDto = {
    username: "gobyy",
    email: "alvaro.guillen",
    password: "test",
    phone: "987654322",
    phoneCountry: "52",
  }
  context.res = {
    body: userService.create(test),
  }
}
