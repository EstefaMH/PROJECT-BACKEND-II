import UsersDTO from "../dto/usersDTO.js";
import { cartsModel } from "../models/cartsModel.js";
import { cartService } from "../services/factory.js";



export class CartsController {

    create = async (req, res) => {
        try {
            let newCart = await cartService.create()
            if (!newCart) return res.status(404).json({ error: 'Producto no encontrado' });
            res.status(200).json(newCart);
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };

    addProduct = async (req, res) => {

        const { cid, pid } = req.params
        const { quantity } = req.body

        try {
            const result = await cartService.addProduct(cid, pid, quantity)
            
            if(result.status == 400){
                res.sendResponse(result)
            }
            
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


}
