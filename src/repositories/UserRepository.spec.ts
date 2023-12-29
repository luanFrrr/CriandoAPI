import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntitiManager.mock";
import { User } from "../entities/User";
import { UserRepository } from "./UserRepository";

describe("UserRepositoy", () => {
  let userRepository: UserRepository;
  let managerMock: Partial<EntityManager>;

  const mockUser: User = {
    user_id: "12345",
    name: "Test User",
    email: "test@example.com",
    password: "password",
  };

  beforeAll(async () => {
    managerMock = await getMockEntityManager({
      saveReturn: mockUser,
    });
    userRepository = new UserRepository(managerMock as EntityManager);
  });

  it("Deve cadastrar um novo usuário no banco de dados", async () => {
    const response = await userRepository.createUser(mockUser);
    expect(managerMock.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  });
});
