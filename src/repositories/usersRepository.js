import { userModel } from "../models/userModel.js";



export class UsersRepository {

  
  async create(data) {
    return await userModel.create(data);
  }

  async findAll() {
    console.log("repo find", userModel.find())
    return await userModel.find();
  }

  /*async findById(id) {
    return await userModel.findByPk(id);
  }

  async update(id, data) {
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
