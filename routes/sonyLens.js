const express = require('express');
const router = express.Router();
const SonyLens = require('../models/sonyLens');

// Getting all SonyLens 
router.get('/', async (req, res) => {
  try {
    const sonylens = await SonyLens.find();
    res.json(sonylens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one SonyLens 
router.get('/:id', getSonyLens, (req, res) => {
  res.json(res.sonylens);
});

// Creating a new camera
router.post('/', async (req, res) => {
  const sonylens = new SonyLens({
      model: req.body.model,
      price: req.body.price
    }
  );

  try {
    const newSonyLens = await sonylens.save();
    res.status(201).json(newSonyLens);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a camera by ID
async function getSonyLens(req, res, next) {
  let sonylens;
  try {
    sonylens = await SonyLens.findById(req.params.id);
    if (sonylens == null) {
      return res.status(404).json({ message: 'Cannot find SonyLens' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.sonylens = sonylens;
  next();
}

module.exports = router; 
