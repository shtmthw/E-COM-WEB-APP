import mongoose from 'mongoose';

const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Add required validation if name should be mandatory
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensure price is not negative
    },
    image: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    total_bought: {
        type: Number,
        default: 0
    }
});

// Use mongoose.model('ModelName', schema) correctly
const product_model = mongoose.models.product || mongoose.model('product', product_schema);

export default product_model;
