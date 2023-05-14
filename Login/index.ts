import { HttpRequest } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { LocalLoginDto } from "./local-login.dto"
import { ErrMessage } from "../src/constants/error-messages.constant"
import { validateBody } from "../src/helpers"
import { UserService } from "../src/services"
import { OperationRes } from "../src/types/common-types.type"
import { AuthService } from "../src/services/auth.service"
import { isSameHashedString } from "../src/helpers/security.helper"
import { TriggerResponse } from "../src/interfaces/trigger-res.interface"
import { LoginResponseDto } from "../src/dtos/response-safe/user-response.dto"
import { badImplementation, badRequest, unauthorized } from "@hapi/boom"
import { ExceptionBuilder } from "../src/utils/exception.builder"

export async function httpTrigger(
  req: HttpRequest
): Promise<TriggerResponse<LoginResponseDto>> {
  try {
    const validation = await validateBody(req, LocalLoginDto)
    if (validation.status === OperationRes.ERROR)
      return ExceptionBuilder(
        400,
        ErrMessage[400].WRONG_BODY,
        validation.errors
      )

    const { body } = validation

    const userService = Container.get(UserService)
    const authService = Container.get(AuthService)

    const existingUser = await userService.getUserByLogin(req.body)
    if (!existingUser) return ExceptionBuilder(401, ErrMessage[401].CREDS)

    const compare = isSameHashedString(body.password, existingUser.password)
    if (!compare) return ExceptionBuilder(401, ErrMessage[401].CREDS)

    const logIn = await authService.localLogin(existingUser)

    return {
      status: 200,
      body: {
        type: "single",
        data: logIn,
      },
    }
  } catch (error) {
    console.log(error)
    return ExceptionBuilder(500, ErrMessage[500].UNKNOWN)
  }
}
