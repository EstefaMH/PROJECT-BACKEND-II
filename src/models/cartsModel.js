import mongoose from 'mongoose';


const cartsSchema = new mongoose.Schema(
    
    {
        products: [
            {
                productId: String,
                quantity: Number
            }
        ],
    }
)

export const cartsModelo = mongoose.model(
    "carts",
    cartsSchema
)




