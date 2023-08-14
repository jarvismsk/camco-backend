const mongoose = require('mongoose');

const nikonSchema = new mongoose.Schema({
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

module.exports = mongoose.model('NikonCamera', nikonSchema);
