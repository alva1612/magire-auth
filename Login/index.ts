import { Context, HttpRequest, HttpResponse } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { LocalLoginDto } from "./local-login.dto"
import { ErrorMessages } from "../src/constants/error-messages.constant"
import { validateBody } from "../src/helpers"
import { UserService } from "../src/services"
import { OperationRes } from "../src/types/common-types.type"
import { AuthService } from "../src/services/auth.service"
import { isSameHashedString } from "../src/helpers/security.helper"
import { ResponseBody } from "../src/interfaces/trigger-res.interface"
import { LoginResponseDto } from "../src/dtos/response-safe/user-response.dto"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const validation = await validateBody(req, LocalLoginDto)
    if (validation.status === OperationRes.ERROR)
      return ErrorMessages()[400].WRONG_BODY

    const { body } = validation

    const userService = Container.get(UserService)
    const authService = Container.get(AuthService)

    const existingUser = await userService.getUserByLogin(req.body)
    if (!existingUser) return ErrorMessages()[401].WRONG_LOGIN

    const compare = isSameHashedString(body.password, existingUser.password)
    if (!compare) return ErrorMessages()[401].WRONG_LOGIN

    const logIn = await authService.localLogin(existingUser)

    const responseBody: ResponseBody<LoginResponseDto> = {
      type: "single",
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
