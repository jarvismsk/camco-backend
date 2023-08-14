const mongoose = require('mongoose');

const sonySchema = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}
);

module.exports = mongoose.model('SonyCamera', sonySchema);
