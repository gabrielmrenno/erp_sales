import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

//Middleware responsável por validar as informações enviadas pelo usuário na request
export async function validRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        location: error.location,
        msg: error.msg,
        param: error.param,
        nestedErrors: error.nestedErrors,
      };
    },
  });

  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  } else {
    next();
  }
}
