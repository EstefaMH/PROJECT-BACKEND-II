
import { ProductsRepository } from "../../repositories/productsRepository.js";
import { TicketRepository } from "../../repositories/ticketRepository.js";


export default class TicketService {
    constructor(ticketRepository = new TicketRepository(), productsRepository = new ProductsRepository()) {
        this.ticketRepository = ticketRepository;
        this.productRepository = productsRepository;
    }

    async createTicket(cart, uid) {
        let totalAmount = 0
        let productsToPurchase = [];

        for (const item of cart.products) {
            const productId = item._id;
            console.log("productId", productId)
            const requestedQuantity = item.quantity;

            const productDB = await this.productRepository.findById(productId);
            console.log("productsDB", productDB)

            if (productDB) {

                const priceAtPurchase = productDB.price;
                const subtotal = requestedQuantity * priceAtPurchase;
                totalAmount += subtotal;

                productsToPurchase.push({
                    productId: productDB._id,
                    quantity: requestedQuantity,
                    priceAtPurchase: priceAtPurchase,
                    subtotal: subtotal
                });
            }

            /*if (productDB.stock < requestedQuantity) {
                      
                      productsFailedStock.push({
                        productId: productDB._id,
                        name: productDB.name,
                        requestedQuantity,
                        availableStock: productDB.stock,
                        reason: 'stock insuficiente .'
                      });
                      console.warn(`stock insuficiente para product ${productDB.name} (ID: ${productId}).`);
                      continue; 
                    }*/


        }


        const newTicket = {
            products: productsToPurchase,
            amount: totalAmount,
            purchaser: uid
        };


        /*for (const item of productsToPurchase) {
          await this.productRepository.updateStock(item.productId, item.quantity); 
          await this.cartRepository.removeProduct(cartId, item.productId); 
        }*/


        return newTicket;
    }


    async getTicketById(ticketId) {
        if (!ticketId) {
            throw new Error('ID Ticket requerido');
        }
        const ticket = await this.ticketRepository.getById(ticketId);
        return ticket;
    }
}