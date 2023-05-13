import { Context, HttpRequest, HttpResponse } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { UserService } from "../src/services"
import { LocalRegistrationDto } from "./local-registration.dto"
import { ErrorMessages } from "../src/constants/error-messages.constant"
import { validateBody } from "../src/helpers/request.helper"
import { badImplementation } from "@hapi/boom"
import {
  ResponseBody,
  TriggerResponse,
} from "../src/interfaces/trigger-res.interface"
import { User } from "@prisma/client"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<TriggerResponse<User>> {
  try {
    const validation = await validateBody(req, LocalRegistrationDto)
    if (validation.status === "error")
      return {
        status: 400,
        body: {
          type: "error",
          data: validation.errors,
        },
      }

    const { body } = validation
    const userService = Container.get(UserService)
    const createdUser = await userService.register(body)

    const responseBody: ResponseBody<User> = {
      type: "single",
      data: createdUser,
    }
    return {
      status: 200,
      body: responseBody,
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      body: {
        type: "error",
        data: badImplementation(ErrorMessages[500].UNKNOWN, error),
      },
    }
  }
}
