// app/test/users/user.service.test.js
import { jest } from "@jest/globals";
import userService from "../../modules/user/user.service.js";
import userRepository from "../../modules/user/user.repository.js";

// Manually mock the individual functions
userRepository.getAll = jest.fn();
userRepository.create = jest.fn();

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("should return all users", async () => {
      const mockUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
      userRepository.getAll.mockResolvedValue(mockUsers);

      const result = await userService.getAll();

      expect(userRepository.getAll).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it("should handle errors thrown by repository", async () => {
      userRepository.getAll.mockRejectedValue(new Error("DB Error"));

      await expect(userService.getAll()).rejects.toThrow("DB Error");
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const newUser = { name: "Charlie" };
      const createdUser = { id: 1, ...newUser };

      userRepository.create.mockResolvedValue(createdUser);

      const result = await userService.create(newUser);

      expect(userRepository.create).toHaveBeenCalledWith(newUser);
      expect(result).toEqual(createdUser);
    });

    it("should handle errors thrown during user creation", async () => {
      userRepository.create.mockRejectedValue(new Error("Insert failed"));

      await expect(userService.create({ name: "Eve" })).rejects.toThrow("Insert failed");
    });
  });
});
