import STATUS_CODE from "../constants/statusCodes.js";

const errorHandler = (err, req, res, next) => {
  const errStatus = res.statusCode || STATUS_CODE.INTERNAL_SERVER_ERROR;
  const errMsg = err.message || "Something went wrong";
  res.json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

export default errorHandler;
