export type StringValues<T> = {
  [P in keyof T]: P
}

interface BodyError {
  status: OperationRes.ERROR
  message: string
  errors?: unknown
}

interface Body<T> {
  status: OperationRes.SUCCESS
  body: T
}

export type ValidatedBody<T> = BodyError | Body<T>

export enum OperationRes {
  ERROR = "error",
  SUCCESS = "success",
}
