const mongoose = require('mongoose');

const mobileNumberSchema = new mongoose.Schema({
    mobilenumber: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    lenses: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('MobileNumber', mobileNumberSchema);
