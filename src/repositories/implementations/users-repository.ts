import { hash } from "bcrypt";
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

  async updatePassword(id: string, password: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
        resetPassword: false,
      },
    });

    return user;
  }

  async findByName(name: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        name,
      },
    });
    return user;
  }

  async resetPassword(id: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        resetPassword: true,
        password: await hash("mudar@123", 8),
      },
    });

    return user;
  }

  async turnAdmin(id: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isAdmin: true,
      },
    });

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        active: false,
      },
    });

    return user;
  }
}
