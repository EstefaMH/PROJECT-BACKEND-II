import { productService } from "../services/factory.js";



export class ProductsController {

    create = async (req, res) => {
        console.log(req.body)
        try {
            const result = await productService.create(req.body);
            if (result.status == 400) {
                res.sendResponse(result)
            }
            res.status(201).json(result);
        } catch (error) {
            res.sendInternalServerError(error)
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
        } catch (error) {
            res.sendInternalServerError(error)
        }
    };



    updateById = async (req, res) => {
        try {
            const result = await productService.updateById(req.params.id, req.body);

            if (result.status == 400 || !result) {
                res.sendResponse(result)
            }
            res.sendSuccess(result)

        } catch (error) {
            res.sendInternalServerError(error)
        }
    };

    deleteById = async (req, res) => {
        try {
            const result = await productService.deleteById(req.params.id);
            if (!result) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.status(204).send();
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    };

}
