import "reflect-metadata";

import { beforeAll, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./create-user-usecase";
import { IUsersRepository } from "../../repositories/users-repository-interface";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/users-repository-inmemory";
import { ICreateUser, IUpdateUser } from "../../dtos/user-dtos";
import { compare } from "bcrypt";
import { ListUserByIdUseCase } from "./list-user-by-id-usecase";
import { ListAllUsersUseCase } from "./list-all-users-usecase";
import { User } from "../../entities/user";
import { UpdateUserUseCase } from "./update-user-usecase";
import { UpdatePasswordUseCase } from "./update-password-usecase";
import { ResetPasswordUseCase } from "./reset-password-usecase";
import { TurnAdminUseCase } from "./turn-admin-usecase";
import { DeleteUserUseCase } from "./delete-user-usecase";
import { AppError } from "../../errors/app-error";

let usersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;
let listAllUsersUseCase: ListAllUsersUseCase;
let listUserByIdUseCase: ListUserByIdUseCase;
let updateUserUseCase: UpdateUserUseCase;
let updatePasswordUseCase: UpdatePasswordUseCase;
let resetPasswordUseCase: ResetPasswordUseCase;
let turnAdminUseCase: TurnAdminUseCase;
let deleteUserUseCase: DeleteUserUseCase;

let newUserData: ICreateUser;
let newUserData2: ICreateUser;

let user: User;
let user2: User;

describe("User", () => {
  beforeAll(async () => {
    usersRepository = new UsersRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(usersRepository);
    listAllUsersUseCase = new ListAllUsersUseCase(usersRepository);
    listUserByIdUseCase = new ListUserByIdUseCase(usersRepository);
    updateUserUseCase = new UpdateUserUseCase(usersRepository);
    updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository);
    resetPasswordUseCase = new ResetPasswordUseCase(usersRepository);
    turnAdminUseCase = new TurnAdminUseCase(usersRepository);
    deleteUserUseCase = new DeleteUserUseCase(usersRepository);

    newUserData = {
      name: "John Doe",
      username: "johndoe",
      role: "admin",
    };

    newUserData2 = {
      name: "John Doe2",
      username: "johndoe2",
      role: "admin",
    };

    user = await createUserUseCase.execute(newUserData);
    user2 = await createUserUseCase.execute(newUserData2);
  });

  it("should create a user", async () => {
    expect(user).toHaveProperty("id");
  });

  it("should not create a user with an existing username", async () => {
    expect(async () => {
      const newUserData3: ICreateUser = {
        name: "John Doe2",
        username: "johndoe",
        role: "admin",
      };

      await createUserUseCase.execute(newUserData3);
    }).rejects.toEqual(new AppError("User already exists", 400));
  });

  it("should isAdmin be false when create a new user", async () => {
    expect(user?.isAdmin).toBe(false);
  });

  it("should create an user with password encrypted and be mudar@123", async () => {
    const passwordIsHashed = await compare("mudar@123", user.password);

    expect(passwordIsHashed).toBe(true);
  });

  it("should resetPassword be true when create a new user", async () => {
    expect(user?.resetPassword).toBe(true);
  });

  it("should isAdmin be true when create a new user", async () => {
    // TODO
  });

  it("should be able to list all active users", async () => {
    const user3 = new User({
      name: "John Doe3",
      username: "johndoe3",
      role: "admin",
    });

    await usersRepository.save(user3);
    await usersRepository.deleteUser(user3.id!);

    const users = await listAllUsersUseCase.execute();

    expect(users).toEqual([user, user2]);
  });

  it("should be able to list a user by id", async () => {
    const findedUser = await listUserByIdUseCase.execute(user?.id!);

    expect(findedUser).toEqual(user);
  });

  it("should throw an error if user doing not exists, finding by id", async () => {
    expect(async () => {
      await listUserByIdUseCase.execute("123");
    }).rejects.toEqual(new AppError("User not found", 404));
  });

  it("should be able to update an user", async () => {
    const updateUserData: IUpdateUser = {
      name: "John Doe Updated",
      role: "production",
    };
    const updateUser = await updateUserUseCase.execute(
      user?.id!,
      updateUserData
    );

    expect(updateUser.name).toBe(updateUserData.name);
    expect(updateUser.role).toBe(updateUserData.role);
  });

  it("should throw an error if user to be updated not exists, updating", async () => {
    expect(async () => {
      const updateUserData: IUpdateUser = {
        name: "John Doe2",
        role: "production",
      };
      await updateUserUseCase.execute("123", updateUserData);
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to update an user's name to an existing name", async () => {
    expect(async () => {
      const updateUserData: IUpdateUser = {
        name: "John Doe2",
      };
      const updatedUser = await updateUserUseCase.execute(
        user?.id!,
        updateUserData
      );
    }).rejects.toEqual(new AppError("Name already exists", 400));
  });

  it("should be able to update an user's password", async () => {
    const password = "1234";

    const updatedPaswordUser = await updatePasswordUseCase.execute({
      id: user?.id!,
      password,
    });

    expect(updatedPaswordUser.resetPassword).toBe(false);
    expect(await compare(password, updatedPaswordUser.password)).toBe(true);
  });

  it("should be able to reset an user's password", async () => {
    const resetPasswordUser = await resetPasswordUseCase.execute(user?.id!);

    const newPassword: string = "mudar@123";

    const passwordIsHashed = await compare(
      newPassword,
      resetPasswordUser.password
    );

    expect(resetPasswordUser.resetPassword).toBe(true);
    expect(passwordIsHashed).toBe(true);
  });

  it("should be able to turn an user in admin", async () => {
    const adminUser = await turnAdminUseCase.execute(user?.id!);

    expect(adminUser.isAdmin).toBe(true);
  });

  it("should be able to delete an user", async () => {
    const userToBeDeleted = await usersRepository.findByName("John Doe2");

    const deletedUser = await deleteUserUseCase.execute(userToBeDeleted?.id!);

    expect(deletedUser).toHaveProperty("id");
    expect(deletedUser.active).toBe(false);
    expect(deletedUser.deletedAt).not.toBe(null);
  });

  it("should throw an error if user to be deleted not exists", async () => {
    expect(async () => {
      await deleteUserUseCase.execute("123");
    }).rejects.toEqual(new AppError("User not found", 404));
  });
});
