import { UsersRepository } from "../../repositories/usersRepository.js";


export default class UserService {

    constructor(repository = new UsersRepository()) {
        this.repository = repository;
    }


    async getAll() {
        const a = this.repository.findAll()
        console.log(a)
        return this.repository.findAll();
    }

}

