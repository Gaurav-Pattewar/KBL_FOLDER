import dummyRepository from "./dummy.repository.js";

class DummyService {
    async getAll() {
        return await dummyRepository.getAll();
    }
}

export default new DummyService();
