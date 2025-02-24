const mongoose = require('mongoose');

// or
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true,
        maxlength: [100, 'Le titre ne doit pas dépasser 100 caractères.']
    },
    description: {
        type: String,
        required: true, 
        trim: true,
        maxlength: [500, 'La description ne doit pas dépasser 500 caractères.']
    },
    price: {
        type: Number,
        required: true, 
        min: [0, 'Le prix doit être un nombre positif.']
    },
    stock: {
        type: Number,
        required: true, 
        min: [0, 'Le stock doit être un nombre valide.']
    },
    imageUrl: {
        type: String,
        required: false, 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now 
    }
});


productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Product = mongoose.model('Product', productSchema);
// const Product = mongoose.model(productSchema);


module.exports = Product;
