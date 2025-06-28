import { productModel } from "../../models/productModel.js";
import { CartsRepository } from "../../repositories/cartsRepository.js";


export default class CartsService {

    constructor(repository = new CartsRepository()) {
        this.repository = repository;
    }

    async create() {
        return this.repository.create()
    }

    async addProduct(cid, pid, quantity) {
        
        const product = await productModel.findById(pid)
        
        if (!product) {
            console.warn(`producto no encontrado`);
            return {status: 400, error: `producto no encontrado con ID ${pid}`};
        }

        return this.repository.addProduct(cid, product, quantity)
    }

    async getAll() { };

    async getById(id) {
        return this.repository.getById(id)
    };

    async updateById() { }

    async deleteAll() { }

    async deleteById() { }

}

