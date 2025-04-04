import { AppDataSource } from "../../config/connection.js";
import { User } from "./user.schema.js";

const UserRepository = () => AppDataSource.getRepository(User);

const create = async (userData) => {
  const repo = UserRepository();
  const user = repo.create(userData);
  return await repo.save(user);
};

const getAll = async () => {
  const repo = UserRepository();
  return await repo.find();
};

export default { getAll, create };
