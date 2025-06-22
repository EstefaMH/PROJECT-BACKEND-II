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

       /*  this.get("/admin", ["ADMIN"], (req, res) => {
            res.sendSuccess(req.user)
        })

        this.post("/login", ["PUBLIC"],async  (req, res) => {
            const { email, password } = req.body;

            console.log("password",password)
            try {
                const user = await userModelo.findOne({email});
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + email);
                    return res.status(202).send({ error: "Not found", message: "Usuario no encontrado con username: " + email });
                }
                
                if (!isValidPassword(user, password)) {
                    console.warn("Invalid credentials for user: " + email);
                    return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
                }
                const tokenUser = {
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    age: user.age,
                    role: user.role
                };
                const access_token = generateToken(tokenUser);
                console.log(access_token);
                res.send({ message: "Login successful!", access_token: access_token, id: user._id });
            } catch (error) {
                console.error(error);
                return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
            }
        })*/
    }
}