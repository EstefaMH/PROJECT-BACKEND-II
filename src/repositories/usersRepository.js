import { userModel } from "../models/userModel.js";



export class UsersRepository {

  
  async create(data) {
    return await userModel.create(data);
  }

  async findAll() {
    return await userModel.find();
  }

}
