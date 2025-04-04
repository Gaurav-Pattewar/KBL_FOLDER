import userRepository from "./user.repository.js";

const getAll = async () => {
  return await userRepository.getAll();
};

const create = async (userData) => {
  return await userRepository.create(userData);
};

export default {
  getAll,
  create,
};
