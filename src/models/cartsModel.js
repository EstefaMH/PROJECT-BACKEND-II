import mongoose from 'mongoose';


const cartsSchema = new mongoose.Schema(

    {
        products: {
            type: [
                {
                    id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "productos"
                    },
                    
                    quantity: Number
                }
            ]
        },
    },
    { collection: 'carts' }
)

export const cartsModelo = mongoose.model(
    "carts",
    cartsSchema
)




