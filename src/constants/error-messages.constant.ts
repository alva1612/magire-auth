export const ErrMessage = {
  400: {
    MISSING_BODY: "No body sent",
    WRONG_BODY: "Wrong Body",
  },
  401: {
    CREDS: "Wrong Log In credentials",
  },
  403: {
    FORBIDDEN: "Forbidden resource",
  },
  500: {
    UNKNOWN: "Something went wrong",
    DB_ERROR: "Database error",
  },
}

export type ErrorCode = keyof typeof ErrMessage

// type ErrorCode = {
//   [code: number]: ErrorType
// }

// interface ErrorType {
//   [key: string]: ErrorResponse
// }

// interface ErrorResponse {
//   status: number
//   body: ErrorBody
// }

// interface ErrorBody {
//   message: string
//   errors?: any
// }
