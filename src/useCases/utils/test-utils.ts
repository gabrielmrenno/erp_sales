import { hash } from "bcrypt";
import { User } from "../../entities/user";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/users-repository-inmemory";
import { Prisma, ProductInfo } from "@prisma/client";
import { ProductsInfoRepository } from "../../repositories/implementations/products-info-repository";
import { ProductsRepositoryInMemory } from "../../repositories/in-memory/products-repository-inmemory";

export async function createUsers(quantity: number) {
  const usersRepository = new UsersRepositoryInMemory();

  let users: User[] = [];

  for (let i = 1; i <= quantity; i++) {
    const newUser = new User({
      name: `John Doe ${i}`,
      username: `johndoe${i}`,
      role: "ADMIN",
      isAdmin: "ADMIN" ? true : false,
      password: await hash("mudar@123", 8),
    });

    const user = await usersRepository.save(newUser);

    users.push(user);
  }

  return users;
}

export async function createProducts(quantity: number) {
  const productsInfoRepository = new ProductsRepositoryInMemory();

  let items: ProductInfo[] = [];

  for (let i = 1; i <= quantity; i++) {
    const productInfo = await productsInfoRepository.create({
      code: i,
      name: `Produto teste ${i}`,
      description: `Descição teste ${i}`,
      group: `Grupo teste ${i}`,
      price: i * 10,
      unit: "FD",
      weight: i * 10,
    });

    items.push({
      ...productInfo,
      code: productInfo.code!,
      price: new Prisma.Decimal(productInfo.price),
      weight: new Prisma.Decimal(productInfo.weight),
    });
  }

  return items;
}
