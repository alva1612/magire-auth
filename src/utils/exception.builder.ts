import {
  badImplementation,
  badRequest,
  forbidden,
  unauthorized,
} from "@hapi/boom"
import { ErrorCode } from "../constants/error-messages.constant"
import { ErrorBody, TriggerResponse } from "../interfaces/trigger-res.interface"
import { error } from "console"

export function ExceptionBuilder<T>(
  status: ErrorCode,
  message: string,
  ...errors
): TriggerResponse<T> {
  const body: ErrorBody = {
    type: "error",
    error: null,
  }
  switch (status) {
    case 400:
      body.error = badRequest(message, errors)
      break
    case 401:
      body.error = unauthorized(message, errors)
      break
    case 403:
      body.error = forbidden(message, error)
      break
    case 500:
      body.error = badImplementation(message, error)
      break
    default:
      throw new Error(`${status} error not implemented`)
  }
  return {
    status: status,
    body,
  }
}
