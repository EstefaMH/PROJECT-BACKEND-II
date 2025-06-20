import UsersDTO from "../dto/usersDTO.js";
import { userService } from "../services/factory.js";



export class UserController {
    
    getAll = async (req, res) => {
        try {
             console.log("contr")
            const result = await userService.getAll();
            console.log("res contr", result)
           // res.status(200).json(result);
           
           res.sendSuccess(result); 
        } catch (error) {
           res.sendInternalServerError(error)
        }
    };

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
