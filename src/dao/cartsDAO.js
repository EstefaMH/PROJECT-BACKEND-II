import { config } from "../config/config.js";
import { FilesManager } from "../data/FilesManager.js"
import { ProductsDTO } from "../dto/ProductsDTO.js";

export class CartsDAO {

    /**
     * Metodo para recuperar todos los productos 
     * @returns { Array<ProductsDTO> }
     */
    static async getCarts() {
        FilesManager.setPath(config.dataFiles.cart || './src/data/carrito.json');
        const data = await FilesManager.readFileData();
        console.log("data get", data)
        return data
    }

    /**
     * Metodo para recuperar un rpoducto mediante el id 
     * @param {Number} id 
     * @returns {Object<ProductsDTO>} 
     */
    static async getCartById(id) {

        const data = await this.getCarts();
        console.log(data)

        let exist = data.find(cart => cart.id == id)

        if (!exist) {
            console.log("el cart no existe");
            return { "status": false, "error": "el cart no existe" }
        }

        return { "status": 200, "data": exist.products }
    }

    /**
     * addProduct se encarga de agregar un nuevo producto al archivo products.json
     * @param CartsDTO objeto carrito
     * @returns Object  
     */
    static async addNewCart(cart) {
        try {
            FilesManager.setPath(config.dataFiles.cart || './src/data/carrito.json');


            const addedData = await FilesManager.addInfoFile(cart);
            return { data: addedData, status: 'Añadido con éxito al JSON' };
        } catch (error) {
            console.error('Error adding product:', error);
            return { status: 500, error: 'Error al añadir el producto' };
        }
    }

    /**
    * addProduct se encarga de agregar un nuevo producto al archivo products.json
    * @param CartsDTO objeto carrito
    * @returns Object  
    */
    static async addProductCart(cart) {
        const { cartId, productId, quantity } = cart

        console.log("cartparam", cart, "quantity", quantity)

        try {
            const carts = await this.getCarts()
            const indexArray = carts.findIndex(cart => cart.id == parseInt(cartId));
            console.log("index", indexArray, cartId)

            if (indexArray !== -1) {

               /* const existProductId = carts[indexArray].products.findIndex(product => product.productId == parseInt(productId));
                console.log(existProductId)

                if (existProductId  !== -1) {
                    quantity = carts[indexArray].products[existProductId].quantity += quantity
                }*/
               
               
                const newRow = carts[indexArray]["products"] = [...carts[indexArray]["products"],{
                    "productId": productId,
                    "quantity": quantity
                }];


                FilesManager.setPath(config.dataFiles.cart || './src/data/carrito.json');
                const addedData = await FilesManager.addInfoFile(newRow);
                console.log(addedData)

                await FilesManager.recordFile(JSON.stringify(carts))


                return { status: "ok", res: 'Añadido con éxito al JSON' };

            }

            return { status: false, error: 'El producto no existe' };

        } catch (error) {
            return { status: false, code: 500, error: 'Error de servidor' };
        }
    }

    static async deleteProduct(product) {
        try {
            FilesManager.setPath(config.dataFiles.cart || './src/data/cart.json');


            const addedData = await FilesManager.addInfoFile(product);
            return { data: addedData, status: 'Añadido con éxito al JSON' };
        } catch (error) {
            console.error('Error adding product:', error);
            return { status: 500, error: 'Error al añadir el producto' };
        }
    }

    static async updateProduct(product) {
        try {
            FilesManager.setPath(config.dataFiles.cart || './src/data/cart.json');

            const addedData = await FilesManager.addInfoFile(product);
            return { data: addedData, status: 'Añadido con éxito al JSON' };
        } catch (error) {
            console.error('Error adding product:', error);
            return { status: 500, error: 'Error al añadir el producto' };
        }
    }

}