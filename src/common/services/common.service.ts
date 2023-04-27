import { hashSync } from "bcrypt"
import { Inject, Service } from "typedi"
import { ConfigService } from "../../config/services/config.service"
import { ENV_KEY } from "../../config/constants"

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
