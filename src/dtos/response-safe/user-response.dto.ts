import { Exclude } from "class-transformer"
import { State } from "../../types/common-attributes.type"

export class UserResponseDto {
  id: number
  email: string
  phoneCountry: string
  phone: string
  username: string
  state: State

  @Exclude()
  password?: string
  @Exclude()
  createdAt?: Date
}
