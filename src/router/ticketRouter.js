import { TicketController } from "../controllers/ticketController.js";
import RouterTemplate from "./Router.js";


export default class TicketRouter extends RouterTemplate {

    constructor() {
        super();
        this.controller = new TicketController();
    }

    init() {


        this.get("/:id", ["USER"], this.controller.getTicketById)


        this.post("/user/:uid/cart/:cid",["USER"],this.controller.createTicket)

       

    }
}