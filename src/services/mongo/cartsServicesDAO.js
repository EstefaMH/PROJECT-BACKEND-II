import { productModel } from "../../models/productModel.js";
import { CartsRepository } from "../../repositories/cartsRepository.js";
import { ProductsRepository } from "../../repositories/productsRepository.js";
import ProductsService from "./productsServicesDAO.js";


export default class CartsService {

    constructor(repository = new CartsRepository()) {
        console.log("repository init")
        this.repository = repository;
    }

    async create() {
        return this.repository.create()
    }

    async addProduct(cid, pid, quantity) {
        
        const product = await productModel.findById(pid)
        console.log("pro", product)
        if (!product) {
            console.warn(`producto no encontrado`);
            return {status: 400, error: `producto no encontrado con ID ${pid}`};
        }



        return this.repository.addProduct(cid, product, quantity)
    }

    async getAll() { };

    async getById(id) {
        console.log("service")
        return this.repository.getById(id)
    };

    async updateById() { }

    async deleteAll() { }

    async deleteById() { }

    /* async getAll() {
         const a = this.repository.findAll()
         console.log(a)
         return this.repository.findAll();
     }
 
     async getById(id) {
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

