import { HttpRequest } from "@azure/functions"
import { ClassConstructor, plainToClass } from "class-transformer"
import { validate } from "class-validator"
import { ErrorMessages } from "../constants/error-messages.constant"
import { OperationRes, ValidatedBody } from "../types/common-types.type"

export async function validateBody<T extends object>(
  request: HttpRequest,
  dtoClass: ClassConstructor<T>
): Promise<ValidatedBody<T>> {
  const { body } = request
  if (!body)
    return {
      status: OperationRes.ERROR,
      errors: ErrorMessages()[400].MISSING_BODY,
    }

  const bodyToDto = plainToClass(dtoClass, body)
  const errors = await validate(bodyToDto)

  if (errors && errors.length)
    return {
      status: OperationRes.ERROR,
      errors: ErrorMessages(errors)[400].WRONG_BODY,
    }

  return { status: OperationRes.SUCCESS, body: bodyToDto }
}
