import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "../repositories/implementations/users-repository";

const usersRepository = new UsersRepository();

async function isAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // const { id } = request.user!;

  // const user = await usersRepository.findById(id);

  // if (!user?.isAdmin) {
  //   return response.status(401).json({ error: "User is not authorized" });
  // }

  return next();
}

export { isAdmin };
