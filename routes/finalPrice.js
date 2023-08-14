const express = require('express');
const router = express.Router();
const FinalPrice = require('../models/finalPrice');

// Save final price
router.post('/', async (req, res) => {
    try {
        const { brand, model, totalPrice } = req.body;
        const finalPrice = new FinalPrice({
            brand,
            model,
            totalPrice
        });
        await finalPrice.save();
        res.status(201).json(finalPrice);
    } catch (error) {
        console.error('Error saving final price:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all final prices
router.get('/', async (req, res) => {
    try {
        const finalPrices = await FinalPrice.find();
        res.status(200).json(finalPrices);
    } catch (error) {
        console.error('Error fetching final prices:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
