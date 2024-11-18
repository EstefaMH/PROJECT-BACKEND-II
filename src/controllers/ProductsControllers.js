import { productosModelo } from "../models/productsModel.js"


export class ProductsController {
    

    static async getProducts(limit = 9, page = 1, sort = 1, filter = undefined) {
        try {
            const skip = (page - 1) * limit;
            const query = filter ? { category: filter } : {};
            const sortOptions = { price: parseInt(sort) }; 

            const data = await productosModelo.find(query)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .lean();

            const totalDocs = await productosModelo.countDocuments(query);
            const totalPages = Math.ceil(totalDocs / limit);

            return {
                status: 'success',
                payload: data,
                totalPages,
                currentPage: page,
                hasPrevPage: page > 1,
                hasNextPage: page < totalPages,
                prevPage: page > 1 ? page - 1 : null,
                nextPage: page < totalPages ? page + 1 : null,
                prevLink: page > 1 ? `/?page=${parseInt(page) - 1}` : null,
                nextLink: page < totalPages ? `/?page=${parseInt(page) + 1}` : null,
            };
        } catch (error) {
            console.error('Error en la carga de los productos:', error);
            return {
                status: 'error',
                message: `Error en la carga de los productos, error: ${error} `,
            };
        }
    }


    static async getProductoById(id) {
        return await productosModelo.findById(id).lean()
    }

    static async getByCategory(category = "") {
        const filter = await productosModelo.find({ category: category }).lean()
        console.log("filter", filter)
        return filter
    }

    static async getUniqueCategories() {
        const pipeline = [
            { $unwind: "$category" },
            { $group: { _id: "$category" } },
            { $project: { _id: 1 } }
        ];

        const uniqueCategories = await productosModelo.aggregate(pipeline);
        return uniqueCategories.map(category => category._id);
    }

    static async getProductoByCode(code = "") {  //
        return await productosModelo.findOne({ code: code }).lean()
    }

    static async createProducto(producto = {}) {
        let nuevoProducto = await productosModelo.create(producto)
        return nuevoProducto.toJSON()
    }

    static async updateProducto(id, aModificar) {
        // return await productosModelo.updateOne({_id:id}, aModificar)
        return await productosModelo.findByIdAndUpdate(id, aModificar, { new: true }).lean()
    }

    static async deleteProducto(id) {
        // return await productosModelo.deleteOne({_id:id}) 
        return await productosModelo.findByIdAndDelete(id).lean()
    }
}
