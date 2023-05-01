import { compareSync, hashSync } from "bcrypt"
import { ENV_KEY } from "../constants"

export function hashPassword(password: string): string {
  const salt = this.configService.get(ENV_KEY.SALT)
  const hashedPassword = hashSync(password, salt)
  return hashedPassword
}

export function isSameHashedString(testingString: string, hash: string) {
  const isSameString = compareSync(testingString, hash)
  return isSameString
}
