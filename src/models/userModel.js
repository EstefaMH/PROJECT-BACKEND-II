import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(

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
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'admin'],
        }
    },
    { collection: 'user' }
)




export const userModel = mongoose.model(
    "user",
    userSchema
)



