import { StatusCodes } from "http-status-codes";
import CustomApiError from "./CustomApiError";

class UnAuthenticatedError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError;
