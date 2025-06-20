import { ProductsController } from "../controllers/productsController.js";
import RouterTemplate from "./Router.js";


export default class ProductsRouter extends RouterTemplate {

    constructor() {
        super();
        this.controller = new ProductsController();
    }

    init() {
        this.post("/", ["ADMIN"], this.controller.create)

        this.get("/", ["PUBLIC"], this.controller.getAll)

        this.get("/:id", ["PUBLIC"], this.controller.getById)

        this.put("/:id", ["ADMIN"], this.controller.updateById)

        this.delete("/", ["ADMIN"], this.controller.deleteAll)

        this.delete("/:id", ["ADMIN"], this.controller.deleteById)
    }
}