export const ErrorMessages = (errors?) /*: ErrorCode */ => ({
  400: {
    MISSING_BODY: {
      status: 400,
      body: {
        message: "No body sent",
      },
    },
    WRONG_BODY: {
      status: 400,
      body: {
        message: "Wrong Body",
        errors: errors,
      },
    },
  },
  401: {
    WRONG_LOGIN: {
      status: 401,
      body: {
        message: "Wrong Log In credentials",
      },
    },
  },
  500: {
    UNKNOWN: {
      status: 500,
      body: {
        message: "Something went wrong",
      },
    },
  },
})

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
