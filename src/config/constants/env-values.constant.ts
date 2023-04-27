export const ENV_VARIABLE: TEnvVariable = {
  SALT: +process.env.SALT,
  DATABASE_URL: process.env.DATABASE_URL,
}

export type TEnvVariable = {
  DATABASE_URL: string
  SALT: number
}
