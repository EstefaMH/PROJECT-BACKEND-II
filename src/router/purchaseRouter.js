import passport from "passport";
import { AuthController } from "../controllers/authController.js";
import RouterTemplate from "./Router.js";
import { PurchaseController } from "../controllers/purchaseController.js";


export default class PurchaseRouter extends RouterTemplate {

    constructor() {
        super();
        this.controller = new PurchaseController();
    }

    init() {


        this.get("/", ["PUBLIC"], this.controller.getAll)

        //Crear una compra
        this.post("/user/:uid/cart/:cid",["PUBLIC"],this.controller.create)

        //Crear una factura
        this.post("/",["PUBLIC"],this.controller.create)


        /* this.get("/user", ["USER"], (req, res) => {
             res.send(req.user)
         })
 
          this.get("/admin", ["ADMIN"], (req, res) => {
             res.sendSuccess(req.user)
         })
 
         */
    }
}