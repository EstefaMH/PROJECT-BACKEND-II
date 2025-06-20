import passport from "passport";
import UsersDTO from "../dto/usersDTO.js";
import { authService, userService } from "../services/factory.js";



export class AuthController {

    getAll = async (req, res) => {
        try {
            console.log("contr")
            const result = await userService.getAll();
            console.log("res contr", result)

            res.sendResponse(result)
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };

    register = async (req, res) => {

        try {
            console.log("Usuario registrado con éxito:");
            console.log(req.user);

            res.status(201).json({ status: "success", message: "Usuario creado con exito" });
        } catch (error) {
            console.error("Error en AuthController.register:", error);
            res.sendInternalServerError(error);
        }


        /* try {
             const result = await authService.create(req.body);
             console.log("res cont", result)
             res.status(201).json(result);
             
         } catch (e) {
             res.status(400).json({ error: e.message });
         }*/
    }

    login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = await authService.login(email, password);
            console.log("res", result)
            const { access_token, status, message, id, cartId, error } = result;
            if (status === 200) {
                res.cookie('cartId', cartId);
                res.sendResponse({ access_token, status, message, id })
            }

            if (status === 404) {
                res.sendResponse({ status, error, message })
            }

            if (status === 401) {
                res.sendResponse({ status, error, message })
            }

        } catch (error) {
            console.error(error);
            return res.status(500).send({ status: "error", error: "Error interno de la applicacion." });
        }
    }


    /*create = async (req, res) => {
        console.log(req.body)
        try {
            const usersDTO = new UsersDTO(req.body);
            const result = await this.service.create(usersDTO);
            console.log("res cont", result)
            res.status(201).json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };


    getById = async (req, res) => {
        try {
            const result = await this.service.getById(req.params.id);
            if (!result) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    create = async (req, res) => {
        console.log(req.body)
        try {
            const result = await this.service.create(req.body);
            console.log("res cont", result)
            res.status(201).json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    update = async (req, res) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            if (!result) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    delete = async (req, res) => {
        try {
            const deleted = await this.service.remove(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.status(204).send();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };*/
}
