import { prisma } from "../../database/prisma-client";
import { IFindUserByUniqueValues, IUpdateUser } from "../../dtos/user-dtos";
import { User } from "../../entities/user";
import { IUsersRepository } from "../users-repository-interface";

export class UsersRepository implements IUsersRepository {
  async save(user: User): Promise<void> {
    await prisma.user.create({
      data: user,
    });
  }

  async findByUniqueValues({
    name,
    username,
  }: IFindUserByUniqueValues): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ name }, { username }],
      },
    });

    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }

  async update(id: string, data: IUpdateUser): Promise<User> {
    // update with Prisma
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }
}
