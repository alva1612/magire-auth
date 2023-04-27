import { StringValues } from "../../common/types/common-types.type"
import { TEnvVariable } from "./env-values.constant"

export const ENV_KEY: StringValues<TEnvVariable> = {
  SALT: "SALT",
  DATABASE_URL: "DATABASE_URL",
}
