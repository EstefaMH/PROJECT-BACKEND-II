import UsersDTO from "../dto/usersDTO.js";
import { cartsModel } from "../models/cartsModel.js";
import { cartService } from "../services/factory.js";



export class CartsController {





    create = async (req, res) => {
        try {
            console.log("contr")
            let newCart = await cartService.create()
            console.log("new", newCart)
            if (!newCart) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.status(200).json(newCart);
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };

    addProduct = async (req, res) => {

        const { cid, pid } = req.params
        const { quantity } = req.body

        console.log("req", cid, pid, quantity)
        try {
            const result = await cartService.addProduct(cid, pid, quantity)
            
            if(result.status == 400){
                res.sendResponse(result)
            }
            
            console.log("res", result)
            res.status(200).json(result);
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };


    getById = async (req, res) => {
        console.log(req.params.cid)
        if (!req.params.cid) {
            res.status(400).json({ error: "el cart ID es obligatorio" });
        }
        try {
            const result = await cartService.getById(req.params.cid);
            if (!result) return res.status(404).json({ error: 'Cart no encontrado' });
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    updateById = async (req, res) => {

    }

    deleteAll = async (req, res) => { }

    deleteById = async (req, res) => { }





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
