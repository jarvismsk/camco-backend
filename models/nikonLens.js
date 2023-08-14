const mongoose = require('mongoose');

const nikonLensSchema = new mongoose.Schema({
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

module.exports = mongoose.model('NikonLens', nikonLensSchema);
