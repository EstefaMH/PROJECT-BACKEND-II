import { ProductsDTO } from "../dto/ProductsDTO.js";
import UsersDTO from "../dto/usersDTO.js";
import { productService } from "../services/factory.js";



export class ProductsController {

    create = async (req, res) => {
        console.log(req.body)
        try {
            const productDTO = new ProductsDTO(req.body);
             console.log("res cont", productDTO )
            const result = await productService.create(req.body);
            console.log("res cont", result)
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

    getAll = async (req, res) => {
        try {
            const result = await productService.getAll();
            res.sendSuccess(result);
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };


    getById = async (req, res) => {
        try {
            const result = await productService.getById(req.params.id);

            if (!result) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.json(result);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };



   /* updateById = async (req, res) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            if (!result) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.json(result);
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    deleteAll = async (req, res) => {
        try {
            const deleted = await this.service.remove(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.status(204).send();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };

    deleteById = async (req, res) => {
        try {
            const deleted = await this.service.remove(req.params.id);
            if (!deleted) return res.status(404).json({ error: 'Tarea no encontrada' });
            res.status(204).send();
        } catch (e) {
            res.status(400).json({ error: e.message });
        }
    };*/
}
