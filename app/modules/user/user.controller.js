import { Router } from "express";
import { ResponseHandler } from "../../utility/response-handler.js";
import userService from "./user.service.js";
import { USER_MESSAGES } from "./user.constant.js";
import { validateRequest } from "../../utility/middlewares/validate-request.js";
import { createUserSchema } from "./user.validation.js";
import { permit } from "../../utility/auth.js";

export const UserRouter = Router();

UserRouter.get("/",permit(["user"]),
async (req, res, next) => {
  try {
    // const error = new Error("This is a hardcoded error in the route file");
    // error.status = 400; // Bad Request
    // throw error;
    const result = await userService.getAll();
    res
      .status(200)
      .json(
        new ResponseHandler(
          true,
          200,
          USER_MESSAGES.USER_DATA_FETCHED_SUCCESSFULLY,
          result
        )
      );
  } catch (error) {
    next(error);
  }
});

UserRouter.post(
  "/",
  validateRequest(createUserSchema),
  async (req, res, next) => {
    try {
      const result = await userService.create(req.body);
      res
        .status(200)
        .json(
          new ResponseHandler(
            true,
            200,
            USER_MESSAGES.USER_ADDED_SUCCESSFULLY,
            result
          )
        );
    } catch (error) {
      next(error);
    }
  }
);
