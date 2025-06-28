import mongoose from 'mongoose';

const ProductTicketSchema = new mongoose.Schema({
    id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Cantidad debe ser mayor a 1']
    },
    priceAtPurchase: { 
        type: Number,
        required: true,
        min: [0, 'Precio no puede ser negativo']
    },
    subtotal: { 
        type: Number,
        required: true,
        min: [0, 'Subtotal must be non-negative']
    }
}, { _id: false });


const TicketSchema = new mongoose.Schema({
    
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    products: {
        type: [ProductTicketSchema],
        default: [],
        required: true
    },
    amount: {
        type: Number,
        required: true,
        min: [0, 'Monto debe ser mayor a cero']
    },
    purchaser: {
        type: String,
        required: true
    }
});

TicketSchema.pre('save', function(next) {
    let totalAmount = 0;
    this.products.forEach(product => {
        product.subtotal = product.quantity * product.priceAtPurchase;
        totalAmount += product.subtotal;
    });
    this.amount = totalAmount; 
    next();
});

export const TicketModel = mongoose.model('tickets', TicketSchema);

