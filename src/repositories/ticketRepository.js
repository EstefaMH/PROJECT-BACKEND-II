import { TicketModel } from "../models/ticketModel.js"




export class TicketRepository {

  
  async create(data) {
    return await TicketModel.create(data);
  }

  async findbyId(id) {
    return await TicketModel.find(id);
  }

}
