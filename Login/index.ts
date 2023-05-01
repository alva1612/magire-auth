import { Context, HttpRequest, HttpResponse } from "@azure/functions"
import "reflect-metadata"
import Container from "typedi"
import { LocalLoginDto } from "./local-login.dto"
import { ErrorMessages } from "../src/constants/error-messages.constant"

export async function httpTrigger(
  context: Context,
  req: HttpRequest
): Promise<HttpResponse> {
  try {
  } catch (error) {
    console.log(error)
    return ErrorMessages()[500].UNKNOWN
  }
}
