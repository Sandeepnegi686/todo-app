import { StatusCodes } from "http-status-codes";

function errorHandlerMiddleware(error, req, res, next) {
  console.log("eeeeeeeeeeeeeeee");
  const defaultError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || "Something went wrong, please try again.",
  };
  if (error.name === "ValidationError") {
    console.log("validation error");
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email format not supported" });
  }
}

export default errorHandlerMiddleware;
