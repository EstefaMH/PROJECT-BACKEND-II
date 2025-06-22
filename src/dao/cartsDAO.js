import { cartsModel } from "../models/cartsModel.js";

export class CartsDAO {

    static async getCarts() {
        return await cartsModel.find().lean()
    }

    static async getCartById(id) {

        return await cartsModel.findById(id)
          .populate({
            path: 'products.id',
            model: 'productos'
          }).lean()

    }

    static async addNewCart(cart = {}) {
        let newCart = await cartsModel.create(cart)
        return newCart.toJSON()
    }

    static async updateCart(cid, pid, quantity) {
        return await cartsModelo.findOneAndUpdate(
            { _id: cid, 'products.id': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        );
    
    }

    static async postProductToCart(cid, cartProduct) {
       
        const findCart = await cartsModelo.findById(cid);

        const index = findCart.products.findIndex(product => product.id == cartProduct.id);

        if (index !== -1) {

            return await cartsModelo.findOneAndUpdate(
                { _id: cid, 'products.id': cartProduct.id },
                { $inc: { 'products.$.quantity': cartProduct.quantity } },
                { new: true }
            );

        }

        return await cartsModelo.updateOne(
            { _id: cid },
            { $push: { products: cartProduct } }
            , { w: 1 }
        );

    }



    static async deleteProductCart(pid, cid) {

        return await cartsModelo.updateOne(
            { _id: cid, 'products.id': pid },
            { $pull: { products: { id: pid } } }
          );
    }


    static async deleteAllProductsCart(cid) {
       return await cartsModelo.updateOne(
            { _id: cid },
            { $set: { products: [] } }
        );
    }



}