const express = require('express');
const router = express.Router();
const CanonLens = require('../models/canonLens');

// Getting all CanonLens 
router.get('/', async (req, res) => {
  try {
    const canonlens = await CanonLens.find();
    res.json(canonlens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one canonlens 
router.get('/:id', getCanonLens, (req, res) => {
  res.json(res.canonlens);
});

// Creating a new camera
router.post('/', async (req, res) => {
  const canonlens = new CanonLens({
      model: req.body.model,
      price: req.body.price
    }
  );

  try {
    const newCanonLens = await canonlens.save();
    res.status(201).json(newCanonLens);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a camera by ID
async function getCanonLens(req, res, next) {
  let canonlens;
  try {
    canonlens = await CanonLens.findById(req.params.id);
    if (canonlens == null) {
      return res.status(404).json({ message: 'Cannot find CanonLens' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.canonlens = canonlens;
  next();
}

module.exports = router;
