import { Router } from "express";
import authService from "./auth.service.js";
import { ResponseHandler } from "../../utility/response-handler.js";
import { validateRequest } from "../../utility/middlewares/validate-request.js";
import { createUserSchema,createLoginSchema } from "./auth.validation.js";
import { AUTH_MESSAGES } from "./auth.constant.js";

export const AuthRouter = Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: "user@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

AuthRouter.post("/login", async (req, res, next) => {
  try {
    const { error} = createLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json(new ResponseHandler(false, 400, error.details[0].message));
    }
    const result = await authService.login(req.body);
    res
      .status(200)
      .json(new ResponseHandler(true, 200, AUTH_MESSAGES.LOGIN, result));
  } catch (e) {
    next(e);
  }
});

AuthRouter.post(
  "/signup",
  validateRequest(createUserSchema),
  async (req, res, next) => {
    try {
      const result = await authService.signUp(req.body);
      res
        .status(201)
        .json(new ResponseHandler(true, 201, AUTH_MESSAGES.SIGNUP, result));
    } catch (e) {
      next(e);
    }
  }
);
