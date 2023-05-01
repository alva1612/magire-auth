export type StringValues<T> = {
  [P in keyof T]: P
}
