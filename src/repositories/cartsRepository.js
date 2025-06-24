import { cartsModel } from "../models/cartsModel.js";
import { userModel } from "../models/userModel.js";



export class CartsRepository {


  async create() {
    return await cartsModel.create({});
  }

  async addProduct(cid, product, quantity) {

    const findCart = await cartsModel.findById({ _id: cid });
   
    if (!findCart) {
      console.warn(`Cart con ID ${cid} no encontrado`);
      throw new Error(`Cart con ID ${cid} no encontrado`);
    }

    const index = findCart.products.findIndex(
      (item) => item._id.toString() === product._id.toString()
    );

    if (index !== -1) {

      return await cartsModel.findOneAndUpdate(
        { _id: cid, 'products._id': product._id },
        { $inc: { 'products.$.quantity': quantity } },
        { new: true }
      );
    }

    return await cartsModel.updateOne(
      { _id: cid },
      {
        $push: {
          products: {
            product: product._id, 
            quantity: quantity
          }
        }
      },
      { new: true }
    );
  }

  async findAll() {
    console.log("repo find", userModel.find())
    return await userModel.find();
  }

  async getById(id) {
    console.log("model")
    return await cartsModel.findById({ _id: id });
  }

  /*async update(id, data) {
    const tarea = await userModel.findByPk(id);
    if (!tarea) return null;

    await tarea.update(data);
    return tarea;
  }

  async delete(id) {
    const tarea = await userModel.findByPk(id);
    if (!tarea) return null;

    await tarea.destroy();
    return true;
  }*/
}
