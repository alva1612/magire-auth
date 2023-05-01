import { Inject, Service } from "typedi"
import { ConfigService } from "./config.service"

@Service()
export class CommonService {
  @Inject()
  configService: ConfigService
}
