import { HttpRequest } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { UserService } from "../src/services"
import { LocalRegistrationDto } from "./local-registration.dto"
import { ErrMessage } from "../src/constants/error-messages.constant"
import { validateBody } from "../src/helpers/request.helper"
import { badImplementation, badRequest } from "@hapi/boom"
import {
  ResponseBody,
  TriggerResponse,
} from "../src/interfaces/trigger-res.interface"
import { User } from "@prisma/client"
import { ExceptionBuilder } from "../src/utils/exception.builder"
import { OperationRes } from "../src/types/common-types.type"

export async function httpTrigger(
  req: HttpRequest
): Promise<TriggerResponse<User>> {
  try {
    const validation = await validateBody(req, LocalRegistrationDto)
    if (validation.status === OperationRes.ERROR)
      return ExceptionBuilder(
        400,
        ErrMessage[400].WRONG_BODY,
        validation.errors
      )

    const { body } = validation
    const userService = Container.get(UserService)
    const createdUser = await userService.register(body)

    return {
      status: 200,
      body: {
        type: "single",
        data: createdUser,
      },
    }
  } catch (error) {
    console.log(error)
    return ExceptionBuilder(500, ErrMessage[500].UNKNOWN)
  }
}
