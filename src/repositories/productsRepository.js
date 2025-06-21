import { productModel } from "../models/productModel.js";
import { userModel } from "../models/userModel.js";



export class ProductsRepository {

  async create(product) {
    return await productModel.create(product)
  }

  async findAll(limit = 9, page = 1, sort = 1, query = {}) {

    try {
      const skip = (page - 1) * limit;
      const sortOptions = { price: parseInt(sort) };

      const data = await productModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean();

      const totalDocs = await productModel.countDocuments(query);
      const totalPages = Math.ceil(totalDocs / limit);

      return {
        data,
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

  async findById(id) {
    return await productModel.findById(id);
  }

  async updateById(id, data) {
    return await productModel.findByIdAndUpdate(id, data, { new: true })
  }

  async deleteById(id) {
    return await productModel.findByIdAndDelete(id)
   
  }
}
