import userService from "../user/user.service.js";
import { createHash } from "../../utility/password.js";
import { createToken } from "../../utility/auth.js";

const signUp = async (user) => {
  const hashedPassword = await createHash(user.password);
  user.password = hashedPassword;
  const result = await userService.create(user);
  return result;
};

const login = async (user) => {
  const token = createToken({ ...user, id: 1, role: "admin" });
  return token;
};
export default {
  login,
  signUp,
};
