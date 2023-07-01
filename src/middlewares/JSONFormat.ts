import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandlerJSON: ErrorRequestHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof SyntaxError && error.message.includes("JSON")) {
    res
      .status(400)
      .json({ message: "Request error. Check the JSON format." });
  } else {
    next();
  }
};

export { errorHandlerJSON };
