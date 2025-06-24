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

                    quantity: { type: Number, required: true, default: 1 }
                }
            ]
        },
    },
    { collection: 'carts' }
)

export const cartsModel = mongoose.model(
    "carts",
    cartsSchema
)




