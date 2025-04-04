import { AppDataSource } from "../../config/connection.js";
import { User } from "./dummy.schema.js";

export const UserRepository = AppDataSource.getRepository(User);

const create = async (userData) => {
  const user = UserRepository.create(userData);
  return await UserRepository.save(user);
};

const getAll = async () => {
  return await UserRepository.find();
};

export default { getAll, create };
