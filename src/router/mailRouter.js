import { MailController } from "../controllers/mailController.js";
import RouterTemplate from "./Router.js";


export default class MailRouter extends RouterTemplate {
    
    constructor(){
        super(); 
        this.controller = new MailController();
    }
    
    init() {

       
       this.get("/", ["PUBLIC"], this.controller.sendEmail)

       this.post("/recovery-password", ["PUBLIC"], this.controller.sendRecoveryEmail)

       this.get("/attachments", ["PUBLIC"], (req, res) => {
            res.send(req.user)
        })

    }
}