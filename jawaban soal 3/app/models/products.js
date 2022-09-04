const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    price: {
        required: true,
        type: Number
    },
    imageurl: {
        required: true,
        type: String
    },
    created_at: {
        require: true,
        type: Date
    },
    updated_at: {
        required: true,
        type: Date
    }
});

module.exports = mongoose.model('ProductModel', dataSchema);