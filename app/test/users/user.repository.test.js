// app/test/users/user.repository.test.js
import { jest } from "@jest/globals";
import userRepository from "../../modules/user/user.repository.js";
import { AppDataSource } from "../../config/connection.js";

// This mocks the getRepository method itself
AppDataSource.getRepository = jest.fn();

describe("User Repository", () => {
  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(() => {
    AppDataSource.getRepository.mockReturnValue(mockRepository);
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create and save a new user", async () => {
      const userData = { name: "Alice" };
      const createdUser = { id: 1, ...userData };

      mockRepository.create.mockReturnValue(userData);
      mockRepository.save.mockResolvedValue(createdUser);

      const result = await userRepository.create(userData);

      expect(mockRepository.create).toHaveBeenCalledWith(userData);
      expect(mockRepository.save).toHaveBeenCalledWith(userData);
      expect(result).toEqual(createdUser);
    });
  });

  describe("getAll", () => {
    it("should return all users", async () => {
      const mockUsers = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];
      mockRepository.find.mockResolvedValue(mockUsers);

      const result = await userRepository.getAll();

      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });
});
