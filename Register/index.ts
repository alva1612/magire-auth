import { Context, HttpRequest, HttpResponse } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { ResponseBodyDto } from "../src/common/dtos/response-body.dto"
import { UserService } from "../src/common/services"
import { LocalRegistrationDto } from "../src/modules/registration/dtos/local-registration.dto"
import { validate } from "class-validator"
import { plainToClass } from "class-transformer"
import { ErrorMessages } from "../src/common/constants/error-messages.constant"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
    const { body } = req
    if (!body) return ErrorMessages()[400].MISSING_BODY

    const registrationDto = plainToClass(LocalRegistrationDto, body)
    const errors = await validate(registrationDto)
    if (errors && errors.length) return ErrorMessages(errors)[400].WRONG_BODY

    const userService = Container.get(UserService)
    const createdUser = await userService.create(body)

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
  // if (context.res.status) thr
}
