import { productModel } from "../models/productModel.js";


export class ProductsDAO {

    static async getProducts(limit = 9, page = 1, sort = 1, query = {}) {
        try {
            const skip = (page - 1) * limit;
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

   
    static async getProductById(id) {
        return await productosModelo.findById(id).lean()
    }

    static async getByCategory(category = "") {
        return  await productosModelo.find({ category: category }).lean() 
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

    static async getProductoByCode(code = "") {  
        return await productosModelo.findOne({ code: code }).lean()
    }

    static async addProduct(producto= {}) {
        let newProduct = await productosModelo.create(producto)
        return newProduct.toJSON()
    }

    static async updateProduct(id, modify) {
        return await productosModelo.findByIdAndUpdate(id, modify, { new: true }).lean()
    }

    static async deleteProduct(id) {
        return await productosModelo.findByIdAndDelete(id).lean()
    }

}