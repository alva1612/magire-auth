import { Context, HttpRequest, HttpResponse } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { LocalLoginDto } from "./local-login.dto"
import { ErrorMessages } from "../src/constants/error-messages.constant"
import { validateBody } from "../src/helpers"
import { UserService } from "../src/services"
import { ResponseBodyDto } from "../src/dtos/response-body.dto"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const validationErrors = await validateBody(req, LocalLoginDto)
    if (validationErrors) return validationErrors

    const userService = Container.get(UserService)
    const logIn = await userService.localLogin(req.body)

    const responseBody: ResponseBodyDto = {
      data: logIn,
    }

    return {
      body: responseBody,
    }
  } catch (error) {
    console.log(error)
    return ErrorMessages()[500].UNKNOWN
  }
}
