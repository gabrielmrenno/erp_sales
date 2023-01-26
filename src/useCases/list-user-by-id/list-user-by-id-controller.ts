import { Request, Response } from "express";
import { ListUserByIdUseCase } from "./list-user-by-id-usecase";

export class ListUserByIdController {
  constructor(private listUserByIdUseCase: ListUserByIdUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    // try {
    const user = await this.listUserByIdUseCase.execute(id);

    return response.status(200).json(user);
    // } catch (error) {
    // return response.status(400).json({
    //     message: error.message || 'Unexpected error.',
    // });
    // }
  }
}
