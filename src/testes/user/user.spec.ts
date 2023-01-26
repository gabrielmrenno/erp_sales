import { beforeAll, expect, test } from "vitest";
import { CreateUserUseCase } from "../../useCases/create-user/create-user-usecase";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { userRepositoryInMemory } from "../../repositories/in-memory/users-repository-inmemory";
import { ICreateUser } from "../../dtos/user-dtos";
import { compare } from "bcrypt";
import { ListUserByIdUseCase } from "../../useCases/list-user-by-id/list-user-by-id-usecase";
import { ListAllUsersUseCase } from "../../useCases/list-all-users/list-all-users-usecase";
import { User } from "../../entities/user";

let userRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let listAllUsersUseCase: ListAllUsersUseCase;
let listUserByIdUseCase: ListUserByIdUseCase;

let newUserData: ICreateUser;
let newUserData2: ICreateUser;

let user: User;

beforeAll(async () => {
  userRepository = new userRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(userRepository);
  listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
  listUserByIdUseCase = new ListUserByIdUseCase(userRepository);

  newUserData = {
    name: "John Doe",
    username: "johndoe",
    password: "123456",
    role: "admin",
  };

  newUserData2 = {
    name: "John Doe2",
    username: "johndoe2",
    password: "123456",
    role: "production",
  }

  user = await createUserUseCase.execute(newUserData);

});

test("should create a user", async () => {
  expect(user).toHaveProperty("id");
});

test("should not create a user with an existing username", async () => {
  expect(async () => {
    const newUserData3: ICreateUser = {
      name: "John Doe2",
      username: "johndoe",
      password: "1234567",
      role: "admin",
    };

    await createUserUseCase.execute(newUserData3);
  }).rejects.toBeInstanceOf(Error);
});

test("should isAdmin be false when create a new user", async () => {
  expect(user?.isAdmin).toBe(false);
});

test("should create an user with password encrypted", async () => {
  const passwordIsHashed = await compare(newUserData.password, user?.password!)

  expect(passwordIsHashed).toBe(true);

})

test("should isAdmin be true when create a new user", async () => {
  // TODO
});

test("should be able to list all users", async () => {
  const users = await listAllUsersUseCase.execute();

  expect(users).toHaveLength(1);
})

test("should be able to list a user by id", async () => {
  const findedUser = await listUserByIdUseCase.execute(user?.id!);

  expect(findedUser).toEqual(user);
})

test("should throw an error if user doing not exists, finding by id", async () => {
  expect(async () => {
    await listUserByIdUseCase.execute("123");
  }).rejects.toBeInstanceOf(Error);
})