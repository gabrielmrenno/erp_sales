import { prisma } from "../../database/prisma-client";
import { User } from "../../entities/user";
import { IUsersRepository } from "../users-repository-interface";

export class UsersRepository implements IUsersRepository {
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: user,
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }
}
