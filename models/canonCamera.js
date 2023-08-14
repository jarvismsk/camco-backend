const mongoose = require('mongoose');

const canonSchema = new mongoose.Schema({
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

module.exports = mongoose.model('CanonCamera', canonSchema);
