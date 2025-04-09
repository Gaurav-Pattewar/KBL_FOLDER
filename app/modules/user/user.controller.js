import { Router } from "express";
import { ResponseHandler } from "../../utility/response-handler.js";
import userService from "./user.service.js";
import { USER_MESSAGES } from "./user.constant.js";
import { validateRequest } from "../../utility/middlewares/validate-request.js";
import { createUserSchema } from "./user.validation.js";
import { permit } from "../../utility/auth.js";

export const UserRouter = Router();


/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Admin access required
 */
UserRouter.get("/",permit(["admin"]),
async (req, res, next) => {
  try {
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
