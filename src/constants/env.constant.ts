import { StringValues } from "../types/common-types.type"

export const ENV_KEY: StringValues<TEnvVariable> = {
  SALT: "SALT",
  DATABASE_URL: "DATABASE_URL",
}

export const ENV_VARIABLE: TEnvVariable = {
  SALT: +process.env.SALT,
  DATABASE_URL: process.env.DATABASE_URL,
}

type TEnvVariable = {
  DATABASE_URL: string
  SALT: number
}
