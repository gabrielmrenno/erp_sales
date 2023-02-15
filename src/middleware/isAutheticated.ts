import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/app-error";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

async function isAutheticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token not provided", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, process.env.JWT_SECRET!);

    const { sub } = decoded as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("User isn't authenticate", 401);
  }
}

export { isAutheticated };
