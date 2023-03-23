import { Request, Response } from "express";
import { container } from "tsyringe";
import { TurnAdminUseCase } from "./turn-admin-usecase";

export class TurnAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const turnAdminUseCase = container.resolve(TurnAdminUseCase);

    const { id } = request.params;

    const user = await turnAdminUseCase.execute(id);

    return response.status(200).json({
      message: "User turned admin successfully",
      data: {
        id: user.id,
      },
    });
  }
}
