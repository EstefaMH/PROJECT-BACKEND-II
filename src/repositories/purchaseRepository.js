import { userModel } from "../models/userModel.js";



export class PurchaseRepository {

  
  async create(data) {
    return await userModel.create(data);
  }

  async findAll() {
    console.log("repo find", userModel.find())
    return await userModel.find();
  }

}
