import { beforeAll, expect, test } from "vitest";
import { CreateUserUseCase } from "../../useCases/create-user/create-user-usecase";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { userRepositoryInMemory } from "../../repositories/in-memory/users-repository-inmemory";
import { ICreateUser, IUpdateUser } from "../../dtos/user-dtos";
import { compare, hash } from "bcrypt";
import { ListUserByIdUseCase } from "../../useCases/list-user-by-id/list-user-by-id-usecase";
import { ListAllUsersUseCase } from "../../useCases/list-all-users/list-all-users-usecase";
import { User } from "../../entities/user";
import { UpdateUserUseCase } from "../../useCases/update-user/update-user-usecase";

let userRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let listAllUsersUseCase: ListAllUsersUseCase;
let listUserByIdUseCase: ListUserByIdUseCase;
let updateUserUseCase: UpdateUserUseCase;

let newUserData: ICreateUser;
let newUserData2: ICreateUser;

let user: User;

beforeAll(async () => {
  userRepository = new userRepositoryInMemory();
  createUserUseCase = new CreateUserUseCase(userRepository);
  listAllUsersUseCase = new ListAllUsersUseCase(userRepository);
  listUserByIdUseCase = new ListUserByIdUseCase(userRepository);
  updateUserUseCase = new UpdateUserUseCase(userRepository);

  newUserData = {
    name: "John Doe",
    username: "johndoe",
    role: "admin",
  };

  newUserData2 = {
    name: "John Doe2",
    username: "johndoe2",
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
      role: "admin",
    };

    await createUserUseCase.execute(newUserData3);
  }).rejects.toBeInstanceOf(Error);
});

test("should isAdmin be false when create a new user", async () => {
  expect(user?.isAdmin).toBe(false);
});

test("should create an user with password encrypted and be mudar@123", async () => {
  const passwordIsHashed = await compare("mudar@123", user.password);

  expect(passwordIsHashed).toBe(true);
})

test("should resetPassword be true when create a new user", async () => {
  expect(user?.resetPassword).toBe(true);
});

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

test("should be able to update an user", async () => {
  const updateUserData: IUpdateUser = {
    name: "John Doe2",
    role: "production",
  }
  const updateUser = await updateUserUseCase.execute(user?.id!, updateUserData);

  expect(updateUser.name).toBe(updateUserData.name);
  expect(updateUser.role).toBe(updateUserData.role);
})

test("should throw an error if user to be updated not exists, updating", async () => {
  expect(async () => {
    const updateUserData: IUpdateUser = {
      name: "John Doe2",
      role: "production",
    }
    await updateUserUseCase.execute("123", updateUserData);
  }).rejects.toBeInstanceOf(Error);
})