const express = require('express');
const router = express.Router();
const NikonCamera = require('../models/nikonCamera');

// Getting all nikoncamera 
router.get('/', async (req, res) => {
  try {
    const nikoncamera = await NikonCamera.find();
    res.json(nikoncamera);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one nikoncamera 
router.get('/:id', getNikonCamera, (req, res) => {
  res.json(res.nikoncamera);
});

// Creating a new camera
router.post('/', async (req, res) => {
  const nikoncamera = new NikonCamera({
      model: req.body.model,
      price: req.body.price
    }
  );

  try {
    const newNikonCamera = await nikoncamera.save();
    res.status(201).json(newNikonCamera);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a camera by ID
async function getNikonCamera(req, res, next) {
  let nikoncamera;
  try {
    nikoncamera = await NikonCamera.findById(req.params.id);
    if (nikoncamera == null) {
      return res.status(404).json({ message: 'Cannot find nikoncamera' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.nikoncamera = nikoncamera;
  next();
}

module.exports = router;
