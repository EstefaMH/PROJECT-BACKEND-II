import { CartsController } from "../controllers/cartsController.js";
import { ProductsController } from "../controllers/productsController.js";
import RouterTemplate from "./Router.js";


export default class CartsRouter extends RouterTemplate {

    constructor() {
        super();
        this.controller = new CartsController();
    }

    init() {

        //CREAR CARRO VACIO
        this.post("/", ["PUBLIC"],this.generateCustomResponses, this.controller.create)

        //AÑADIR PRODUCTO A UN CART
        this.post("/:cid/product/:pid", ["USER"], this.controller.addProduct)

        //GET TODOS LOS CARROS
        this.get("/", ["ADMIN"], this.controller.getAll)

        //GET CARRO POR ID 
        this.get("/:cid", ["USER"], this.controller.getById)

        //ACTUALIZAR UN PRODUCTO DEL CARRO
        this.put("/:cid/product/:pid", ["USER"], this.controller.updateById)

        this.delete("/", ["ADMIN"], this.controller.deleteAll)

        //BORRAR UN PRODUCTO DEL CARRO 
        this.delete('/:cid/product/:pid', ["USER"], )
        
        //Borrar carro por Id
        this.delete("/:cid", ["PUBLIC"], this.controller.deleteById)
    }
}