const mongoose = require('mongoose');

const sonyLensSchema = new mongoose.Schema({
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

module.exports = mongoose.model('SonyLens', sonyLensSchema);
