import { Router } from "express";
import { ResponseHandler } from "../../utility/response-handler.js";
import dummyService from "./dummy.service.js";
import { USER_MESSAGES } from "./dummy.constant.js";
import { validateRequest } from "../../utility/middlewares/validate-request.js";
import { createUserSchema } from "./dummy.validation.js";

export const DummyRouter = Router();

DummyRouter.get("/", async (req, res, next) => {
  try {
    // const error = new Error("This is a hardcoded error in the route file");
    // error.status = 400; // Bad Request
    // throw error;
    const result = await dummyService.getAll();
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

DummyRouter.post(
  "/",
  validateRequest(createUserSchema),
  async (req, res, next) => {
    try {
      const result = await dummyService.create(req.body);
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
