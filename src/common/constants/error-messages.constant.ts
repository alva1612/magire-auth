export const ErrorMessages = (errors?) => ({
  400: {
    MISSING_BODY: {
      status: 400,
      message: "No body sent",
    },
    WRONG_BODY: {
      status: 400,
      body: {
        message: "Wrong Body",
        errors: errors,
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
