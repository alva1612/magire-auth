import { Service } from "typedi"
import { ENV_VARIABLE } from "../constants"
import { IConfigService } from "./config.interface"
@Service()
export class ConfigService implements IConfigService {
  get(envKey: string) {
    const envVariable = ENV_VARIABLE[envKey]
    if (!envVariable) {
      console.log("Env variable not set", envKey)
      throw new Error("Env")
    }
    return envVariable
  }
}
