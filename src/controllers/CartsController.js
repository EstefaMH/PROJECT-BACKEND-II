import { cartsModelo } from "../models/cartsModel.js"


export class CartsController {
    static async getCarts() {
        return await cartsModelo.find().lean()
    }

    static async getCartById(id) {  
        return await cartsModelo.findById(id).lean()
    }

    static async addNewCart(cart = {}) {
        let newCart = await cartsModelo.create(cart)
        console.log("new cart", newCart)
        return newCart.toJSON()
    }

    static async updateCart(id, aModificar) {
        // return await cartsModelo.updateOne({_id:id}, aModificar)
        return await cartsModelo.findByIdAndUpdate(id, aModificar, { new: true }).lean()
    }

    static async deleteCart(id) {
        // return await cartsModelo.deleteOne({_id:id}) 
        return await cartsModelo.findByIdAndDelete(id).lean()
    }
}
