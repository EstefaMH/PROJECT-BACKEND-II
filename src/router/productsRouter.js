import { ProductsController } from "../controllers/productsController.js";
import RouterTemplate from "./Router.js";


export default class ProductsRouter extends RouterTemplate {

    constructor() {
        super();
        this.controller = new ProductsController();
    }

    init() {
        //check
        this.post("/", ["ADMIN"], this.controller.create)
        //check
        this.get("/", ["PUBLIC"], this.controller.getAll)
        //check
        this.get("/:id", ["PUBLIC"], this.controller.getById)
        //check
        this.put("/:id", ["ADMIN"], this.controller.updateById)

        this.delete("/", ["ADMIN"], this.controller.deleteAll)
        //check
        this.delete("/:id", ["ADMIN"], this.controller.deleteById)
    }
}