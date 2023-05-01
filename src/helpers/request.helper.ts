import { HttpRequest } from "@azure/functions"
import { ClassConstructor, plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { ErrorMessages } from "../constants/error-messages.constant"

export async function validateBody<T extends object>(
  request: HttpRequest,
  dtoClass: ClassConstructor<T>
) {
  const { body } = request
  if (!body) return ErrorMessages()[400].MISSING_BODY

  const bodyToDto = plainToClass(dtoClass, body)
  const errors = await validate(bodyToDto)

  if (errors && errors.length) return ErrorMessages(errors)[400].WRONG_BODY
}
