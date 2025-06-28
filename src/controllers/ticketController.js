

import { TicketModel } from "../models/ticketModel.js";
import { ProductsRepository } from "../repositories/productsRepository.js";
import { cartService, ticketService } from "../services/factory.js";

export class TicketController {

  constructor(productRepository = new ProductsRepository()) {
    this.productRepository = productRepository
  }

  createTicket = async (req, res) => {
    const { uid, cid } = req.params

    if (!uid || !cid) {
      return res.status(400).json({
        status: 'error',
        message: 'Faltan PARAMS obligatorios: cartID , userID'
      });
    }

    try {

      const cart = await cartService.getById(cid);

      if(!cart){
        res.status(400).json({
        status: 'error',
        message: 'carrito no encontrado'
      });
      }

      const newTicket = await ticketService.createTicket(cart, uid)

      if(newTicket){
        
        res.status(201).json({
            status: 'success',
            message: 'Ticket creado exitosamente.',
            payload: newTicket
        });
      }
    
    } catch (error) {
      console.error('Controller Error - createTicket:', error);

      if (error.message.startsWith('InvalidTicketData:')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      if (error.message.startsWith('Validation Error:')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      if (error.message.startsWith('ProductNotFound:')) {
        return res.status(404).json({ status: 'error', message: error.message });
      }

      if (error.name === 'CastError' && error.path === 'productId') {
        return res.status(400).json({ status: 'error', message: `Formato de ID de producto inválido: ${error.value}` });
      }

      res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor al crear el ticket.'
      });
    }
  };


  getTicketById = async (req, res) => {


    try {
      const ticketId = req.params.id;


      if (!ticketId) {
        return res.status(400).json({ status: 'error', message: 'ID del ticket es requerido.' });
      }

      const ticket = await TicketModel.findById(ticketId);

      if (!ticket) {
        console.log(`Controller: Ticket con ID ${ticketId} no fue encontrado.`);
        return res.status(404).json({ status: 'error', message: 'Ticket no encontrado.' });
      }
      res.status(200).json({ status: 'success', payload: ticket.toJSON() });

    } catch (error) {
      console.error('Controller Error - getTicketById:', error);


      if (error.message.startsWith('InvalidTicketId:')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }

      if (error.name === 'CastError' && error.path === '_id') {
        return res.status(400).json({ status: 'error', message: `Formato de ID de ticket inválido: ${error.value}` });
      }
      res.status(500).json({
        status: 'error',
        message: 'Error interno del servidor al obtener el ticket.'
      });
    }
  };


}

