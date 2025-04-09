// validations/userValidation.js
import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email.",
    "string.empty": "Email is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long.",
    "string.empty": "Password is required.",
  }),
});

export const createLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email":  "Email must be a valid email.",
    }),
      password: Joi.string().required(),
});