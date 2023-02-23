import { Request, Response } from "express";
import { container } from "tsyringe";
import { TurnAdminUseCase } from "./turn-admin-usecase";

export class TurnAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const turnAdminUseCase = container.resolve(TurnAdminUseCase);
    try {
      const { id } = request.params;
      // const { user } = request.user; // TODO: get user from request

      const user = await turnAdminUseCase.execute(id);

      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
