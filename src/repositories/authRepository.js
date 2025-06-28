import { userModel } from "../models/userModel.js";



export class AuthRepository {

  
  async create(data) {
    return await userModel.create(data);
  }

  async findAll() {
    return await userModel.find();
  }

  async findByEmail(email){
    return await userModel.findOne({email})
  }

}
