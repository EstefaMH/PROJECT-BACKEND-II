import fs from "fs"
import { config } from "../config/config.js";
import { FilesManager } from "../data/FilesManager.js"
import { ProductsDTO } from "../dto/ProductsDTO.js";
import { error } from "console";

export class ProductsDAO {

    /**
     * Metodo para recuperar todos los productos 
     * @returns { Promise<Array<ProductsDTO> } 
     */
    static async getProducts() {
        FilesManager.setPath("./src/data/productos.json")
        const data = await FilesManager.readFileData();
        return data
    }

    /**
     * Metodo para recuperar un producto mediante el id 
     * @param {Number} id 
     * @returns { Promise<Object<ProductsDTO>>} 
     */
    static async getProductById(id) {

        const data = await this.getProducts();

        let exist = data.find(product => product.id == id)

        if (!exist) {
            console.log("el producto no existe");

            return { "status": false, "error": "el producto no existe" }
        }

        return exist
    }

    /**
     * addProduct se encarga de agregar un nuevo producto al archivo products.json
     * @param ProductsDTO product 
     * @returns Object  
     */
    static async addProduct(product) {
        try {
            FilesManager.setPath(config.dataFiles.products || './src/data/productos.json');

            const addedData = await FilesManager.addInfoFile(product);
            return { data: addedData, status: 'Añadido con éxito al JSON' };
        } catch (error) {
            console.error('Error adding product:', error);
            return { status: 500, error: 'Error al añadir el producto' };
        }
    }

    static async updateProduct(id, newProduct) {

        const { title, description, code, price, status, category } = newProduct

        try {
            const products = await this.getProducts()
            console.log(products)
            const indexArray = products.findIndex(product => product.id == id);

            if (indexArray !== -1) {
                products[indexArray]["title"] = title;
                products[indexArray]["description"] = description;
                products[indexArray]["code"] = code;
                products[indexArray]["price"] = price;
                products[indexArray]["status"] = status;
                products[indexArray]["category"] = category;



                FilesManager.setPath(config.dataFiles.products || './src/data/productos.json');
                FilesManager.recordFile(JSON.stringify(products))
                return { status: "ok" , res: 'Añadido con éxito al JSON' };

            }

            return { status: false , error: 'El producto no existe' };

        } catch (error) {
            return { status: 500, error: 'Error de servidor' };
        }
    }

    
    static async deleteProduct(id) {
        try {
            const products = await this.getProducts()
            console.log(products)
            const indexArray = products.findIndex(product => product.id == id);

            if (indexArray !== -1) {
                products.splice(indexArray, 1); 
                FilesManager.setPath(config.dataFiles.products || './src/data/productos.json');
                FilesManager.recordFile(JSON.stringify(products))
                return { status: "ok" , res: 'Producto eliminado con exito' };

            }

            return { status: false , error: 'El producto no encontrado' };

        } catch (error) {
            return { status: 500, error: 'Error de servidor' };
        }
    }

}