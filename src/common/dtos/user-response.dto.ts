import { State } from "../types/common-attributes.type"

export class UserResponseDto {
  id: number
  email: string
  phoneCountry: string
  phone: string
  username: string
  state: State
}
