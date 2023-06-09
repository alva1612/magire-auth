export interface ResponseBodySingle<T> {
  type: "single"
  data: T
}
export interface ResponseBodyList<T> {
  type: "list"
  data: T[]
  total: number
}

export interface ErrorBody {
  type: "error"
  error: any
}

export type ResponseBody<T> =
  | ResponseBodySingle<T>
  | ResponseBodyList<T>
  | ErrorBody

export interface TriggerResponse<T> {
  status: number
  body: ResponseBody<T>
}
