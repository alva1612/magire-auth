import { StringValues } from "../types/common-types.type"

export const ENV_KEY: StringValues<TEnvVariable> = {
  SALT: "SALT",
  DATABASE_URL: "DATABASE_URL",
  JWT_EXPIRES: "JWT_EXPIRES",
  JWT_SECRET: "JWT_SECRET",
}

export const ENV_VARIABLE: TEnvVariable = {
  SALT: +process.env.SALT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES: process.env.JWT_EXPIRES,
}

type TEnvVariable = {
  DATABASE_URL: string
  SALT: number
  JWT_SECRET: string
  JWT_EXPIRES: string
}
