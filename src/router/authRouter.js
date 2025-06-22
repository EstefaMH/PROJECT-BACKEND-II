import passport from "passport";
import { AuthController } from "../controllers/authController.js";
import RouterTemplate from "./Router.js";
import { verifyToken } from "../utils/utils.js";


export default class AuthRouter extends RouterTemplate {

    constructor() {
        super();
        this.controller = new AuthController();
    }

    init() {


        this.get("/", ["PUBLIC"], this.controller.getAll)

        //this.post("/register", ["PUBLIC"],this.controller.register)
        this.post(
            "/register",
            ["PUBLIC"],
            this.generateCustomResponses,
            (req, res, next) => {
                passport.authenticate('register', (err, user, info) => {
                    if (err) {
                        console.error("Passport register error (server-side):", err);
                        return res.status(500).json({
                            status: "error",
                            message: err.message || "Error interno del servidor durante el registro."
                        });
                    }
                    if (!user) {
                        console.warn("Passport register failed (user exists or other auth issue):", info);

                        return res.status(409).json({
                            status: "error",
                            message: "El email ya está registrado. Por favor, intenta con otro o inicia sesión."
                        });
                    }

                    req.user = user;
                    next();
                })(req, res, next);
            },
            this.controller.register
        );

        this.post("/login", ["PUBLIC"], this.generateCustomResponses,this.controller.login);

        this.post('/reset-password', ["PUBLIC"],this.generateCustomResponses,verifyToken, this.controller.verifyRecoveryToken);



        /* 
          (req, res, next) => {
                passport.authenticate('jwt', (err, user, info) => {
                    if (err) {
                        console.error("Error en autenticación local:", err);
                        return res.status(500).json({ status: "error", message: "Error interno del servidor." });
                    }
                    if (!user) {
                        return res.status(401).json({ status: "error", message: info.message || 'Credenciales inválidas.' });
                    }
                    
                    req.user = user; 
        
                    next(); 
                })(req, res, next);
            }
        
        
        
        this.get("/user", ["USER"], (req, res) => {
             res.send(req.user)
         })
 
          this.get("/admin", ["ADMIN"], (req, res) => {
             res.sendSuccess(req.user)
         })
 
         */
    }
}