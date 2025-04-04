/* eslint-env jest */
import { jest } from "@jest/globals"; // Required for ESM and jest.mock to work
import request from "supertest";
import express from "express";
import { UserRouter } from "../../modules/user/user.controller.js";
import dummyService from "../../modules/user/user.service.js";
import { USER_MESSAGES } from "../../modules/user/user.constant.js";

// Mock validate-request middleware
jest.mock("../../utility/middlewares/validate-request.js", () => ({
  validateRequest: jest.fn(() => (req, res, next) => next()),
}));

// Manually mock dummyService methods
dummyService.getAll = jest.fn();
dummyService.create = jest.fn();

const app = express();
app.use(express.json());
app.use("/api/users", UserRouter);

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/users", () => {

    it("should return a list of users", async () => {
      const mockUsers = [{ id: 1, name: "John Doe" }];
      dummyService.getAll.mockResolvedValue(mockUsers);

      const res = await request(app).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe(USER_MESSAGES.USER_DATA_FETCHED_SUCCESSFULLY);
      expect(res.body.data).toEqual(mockUsers);
      expect(dummyService.getAll).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when service fails", async () => {
        dummyService.getAll.mockRejectedValue(new Error("Database Error"));
      
        const res = await request(app).get("/api/users");
      
        expect(res.status).toBe(500);
        expect(res.body.success).toBe(undefined);
        expect(res.body.message).toBe(undefined);
      });
      
  });


  describe("POST /api/users", () => {

    it("should create a new user", async () => {
      const newUser = { name: "John Doe" };
      dummyService.create.mockResolvedValue({ id: 1, ...newUser });

      const res = await request(app).post("/api/users").send(newUser);

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe(USER_MESSAGES.USER_ADDED_SUCCESSFULLY);
      expect(res.body.data).toEqual({ id: 1, ...newUser });
      expect(dummyService.create).toHaveBeenCalledWith(newUser);
    });

    it("should handle service failure when creating a user", async () => {
      dummyService.create.mockRejectedValue(new Error("Database Error"));

      const res = await request(app).post("/api/users").send({ name: "John Doe" });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe("Database Error");
    });
  });
});
