import { hashSync } from "bcrypt"
import { Inject, Service } from "typedi"
import { ConfigService } from "./config.service"
import { ENV_KEY } from "../constants"

@Service()
export class CommonService {
  @Inject()
  configService: ConfigService

  hashPassword(password: string): string {
    const salt = this.configService.get(ENV_KEY.SALT)
    const hashedPassword = hashSync(password, salt)
    return hashedPassword
  }
}
