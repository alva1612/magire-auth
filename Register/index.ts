import { Context, HttpRequest, HttpResponse } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { ResponseBodyDto } from "../src/dtos/response-body.dto"
import { UserService } from "../src/services"
import { LocalRegistrationDto } from "./local-registration.dto"
import { ErrorMessages } from "../src/constants/error-messages.constant"
import { validateBody } from "../src/helpers/request.helper"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const validationErrors = await validateBody(req, LocalRegistrationDto)
    if (validationErrors) return validationErrors

    const userService = Container.get(UserService)
    const createdUser = await userService.register(req.body)

    const responseBody: ResponseBodyDto = {
      data: createdUser,
    }
    return {
      body: responseBody,
    }
  } catch (error) {
    console.log(error)
    return ErrorMessages()[500].UNKNOWN
  }
}
