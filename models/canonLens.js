const mongoose = require('mongoose');

const canonLensSchema = new mongoose.Schema({
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

module.exports = mongoose.model('CanonLens', canonLensSchema);
