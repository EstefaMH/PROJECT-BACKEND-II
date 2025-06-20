import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const purchaseSchema = new mongoose.Schema(

    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
        },

        first_name: {
            type: String
        },

        last_name: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Correo es requerido"]
        },
        age: {
            type: Number
        },

        password: String,

        cart: {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' } 
        },
        role: { type: String, default: 'user' }
    },
    { collection: 'purchase' }
)




export const purchaseModel = mongoose.model(
    "purchase",
    purchaseSchema
)



