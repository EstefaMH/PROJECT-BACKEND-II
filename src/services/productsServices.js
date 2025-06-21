import { ProductsDTO } from "../dto/ProductsDTO.js";
import { ProductsRepository } from "../repositories/productsRepository.js";


export default class ProductsService {

    constructor(repository = new ProductsRepository()) {
        this.repository = repository;
    }

    async create(product = {}) {
        const valid = await ProductsDTO.validateData(product)
        if (valid != true) {
            return valid
        }
        return this.repository.create(product)
    }

    async getAll() {
        return this.repository.findAll();
    };

    async getById(id) {
        return this.repository.findById(id)
    };

    async updateById(id, data) {
        const valid = await ProductsDTO.validateDataUpdate(data)
        if (valid != true) {
            return valid
        }
        return this.repository.updateById(id, data)
    }

    async deleteAll() { }

    async deleteById(id) {
        return this.repository.deleteById(id)

    }
}

