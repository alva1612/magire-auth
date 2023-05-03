import { Context, HttpRequest, HttpResponse } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { LocalLoginDto } from "./local-login.dto"
import { ErrorMessages } from "../src/constants/error-messages.constant"
import { validateBody } from "../src/helpers"
import { UserService } from "../src/services"
import { ResponseBodyDto } from "../src/dtos/response-body.dto"
import { OperationRes } from "../src/types/common-types.type"
import { AuthService } from "../src/services/auth.service"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const validation = await validateBody(req, LocalLoginDto)
    if (validation.status === OperationRes.ERROR) return

    const { body } = validation

    const userService = Container.get(UserService)
    const authService = Container.get(AuthService)

    const existingUser = await userService.getUserByLogin(req.body)
    if (!existingUser) return ErrorMessages()[401].WRONG_LOGIN

    const logIn = await authService.localLogin(body.password, existingUser)

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
