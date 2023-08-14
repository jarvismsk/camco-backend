const express = require('express');
const router = express.Router();
const NikonLens = require('../models/nikonLens');

// Getting all nikonlens 
router.get('/', async (req, res) => {
  try {
    const nikonlens = await NikonLens.find();
    res.json(nikonlens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one NikonLens 
router.get('/:id', getNikonLens, (req, res) => {
  res.json(res.nikonlens);
});

// Creating a new camera
router.post('/', async (req, res) => {
  const nikonlens = new NikonLens({
      model: req.body.model,
      price: req.body.price
    }
  );

  try {
    const newNikonLens = await nikonlens.save();
    res.status(201).json(newNikonLens);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a camera by ID
async function getNikonLens(req, res, next) {
  let nikonlens;
  try {
    nikonlens = await NikonLens.findById(req.params.id);
    if (nikonlens == null) {
      return res.status(404).json({ message: 'Cannot find NikonLens' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.nikonlens = nikonlens;
  next();
}

module.exports = router; 
