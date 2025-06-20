import { UsersRepository } from "../repositories/usersRepository.js";


export default class UserService {

    constructor(repository = new UsersRepository()) {
        console.log("repository init")
        this.repository = repository;
    }


    async getAll() {
        const a = this.repository.findAll()
        console.log(a)
        return this.repository.findAll();
    }

    /*async getById(id) {
        validateID(id)
        return this.repository.findById(id);
    }

    async create(data) {
        validateTask(data)
        return this.repository.create(data);
    }

    async update(id, data) {
        validateID(id)
        validateTask(data)

        return this.repository.update(id, data);
    }

    async remove(id) {
        validateID(id)
        return this.repository.delete(id);
    }*/
}

