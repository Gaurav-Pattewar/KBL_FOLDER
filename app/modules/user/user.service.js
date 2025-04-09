import userRepository from "./user.repository.js";

const getAll = async () => {
  return await userRepository.getAll();
};

const create = async (userData) => {
  return await userRepository.create(userData);
};

const findByEmail = async (email) => {
  return await userRepository.findByEmail(email);
};  


export default {
  getAll,
  create,
  findByEmail
};
