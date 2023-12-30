import { UserService } from "./UserServices";
import * as jwt from "jsonwebtoken";

jest.mock("../repositories/UserRepository");
jest.mock("../database", () => ({
  initialize: jest.fn(),
}));
jest.mock("jsonwebtoken");

const mockUserRepository = require("../repositories/UserRepository");

describe("UserService", () => {
  const userService = new UserService(mockUserRepository);
  const mockUser = {
    id_user: "123456",
    name: "Luan",
    email: "luan@test.com",
    password: "123456",
  };

  it("Deve adicionar um novo usuário", async () => {
    mockUserRepository.createUser = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockUser));

    const response = await userService.createUser(
      "Luan",
      "luanrosas@yahoo.com.br",
      "123456"
    );
    expect(mockUserRepository.createUser).toHaveBeenCalled();
    expect(response).toMatchObject({
      id_user: "123456",
      name: "Luan",
      email: "luan@test.com",
      password: "123456",
    });
  });

  it("Deve retornar um token de usuário", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(mockUser));
    jest.spyOn(jwt, "sign").mockImplementation(() => "token");

    const token = await userService.getToken("LUAN@TEST.COM", "123456");
    expect(token).toBe("token");
  });

  it("Deve retornar um erro caso ão encontre um usuário", async () => {
    jest
      .spyOn(userService, "getAuthenticatedUser")
      .mockImplementation(() => Promise.resolve(null));
    await expect(
      userService.getToken("invalid@TEST.COM", "123456")
    ).rejects.toThrowError(new Error("Email/Password invalid!"));
  });
});
