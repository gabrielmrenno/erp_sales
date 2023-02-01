import { Request, Response } from "express";
import { TurnAdminUseCase } from "./turn-admin-usecase";

export class TurnAdminController {
  constructor(private turnAdminUseCase: TurnAdminUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      // const { user } = request.user; // TODO: get user from request

      const user = await this.turnAdminUseCase.execute(id);

      return response.status(200).json(user);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}
