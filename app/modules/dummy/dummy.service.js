import dummyRepository from "./dummy.repository.js";

  const getAll= async() => {
        return await dummyRepository.getAll();
    }

export default {
    getAll
}
