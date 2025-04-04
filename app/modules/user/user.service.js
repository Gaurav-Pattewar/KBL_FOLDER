import dummyRepository from "./user.repository.js";

const getAll = async () => {
  return await dummyRepository.getAll();
};

const create = async (userData) => {
  return await dummyRepository.create(userData);
};

export default {
  getAll,
  create,
};
