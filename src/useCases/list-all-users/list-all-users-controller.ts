import { User } from "@prisma/client";
import { ListAllUsersUseCase } from "./list-all-users-usecase";
import { Request, Response } from "express";

export class ListAllUserController {
    constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}
    
    async handle(request: Request, response: Response): Promise<Response> {
        const users = await this.listAllUsersUseCase.execute();
    
        return response.json(users);
    }
}