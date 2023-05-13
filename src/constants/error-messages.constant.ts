export const ErrorMessages = {
  400: {
    MISSING_BODY: "No body sent",
    WRONG_BODY: "Wrong Body",
  },
  401: {
    WRONG_LOGIN: "Wrong Log In credentials",
  },
  500: {
    UNKNOWN: "Something went wrong",
    DB_ERROR: "Database error",
  },
}

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
