import { productModel } from "../models/productModel.js";
import { ProductsRepository } from "../repositories/productsRepository.js";


export default class ProductsService {

    constructor(repository = new ProductsRepository()) {
        this.repository = repository;
    }

    async create(product = {}) {
        return this.repository.create(product)
    }

    async getAll() {
        return this.repository.findAll();
    };

    async getById(id) {
        return this.repository.findById(id)
    };

    async updateById(id) { }

    async deleteAll() { }

    async deleteById(id) { }
}

