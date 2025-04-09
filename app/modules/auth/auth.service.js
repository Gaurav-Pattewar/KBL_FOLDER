import userService from "../user/user.service.js";
import { createHash,comparePassword } from "../../utility/password.js";
import { createToken } from "../../utility/auth.js";
import { AUTH_MESSAGES } from "./auth.constant.js";

const signUp = async (user) => {
  const hashedPassword = await createHash(user.password);
  user.password = hashedPassword;
  const result = await userService.create(user);
  return result;
};

const login = async (user) => {
  const foundUser = await userService.findByEmail(user.email);
  if (!foundUser) {
    throw Object.assign(new Error(AUTH_MESSAGES.INVALID_CREDENTIALS), { status: 401 });

  }
const isPasswordValid=await comparePassword(user.password, foundUser.password);

  if (!isPasswordValid) {
    throw Object.assign(new Error(AUTH_MESSAGES.INVALID_CREDENTIALS), { status: 401 });
  }

  const token = createToken({ id: foundUser.id, email: foundUser.email,role:"admin" });
  return {
    token,
    user: {
      id: foundUser.id,
      email: foundUser.email,
    },
  };

};
export default {
  login,
  signUp,
};
