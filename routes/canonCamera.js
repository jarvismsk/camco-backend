const express = require('express');
const router = express.Router();
const CanonCamera = require('../models/canonCamera');

// Getting all canon cameras
router.get('/', async (req, res) => {
  try {
    const canoncamera = await CanonCamera.find();
    res.json(canoncamera);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one canon camera
router.get('/:id', getCanonCamera, (req, res) => {
  res.json(res.canoncamera);
});

// Creating a new camera
router.post('/', async (req, res) => {
  const canoncamera = new CanonCamera({
      model: req.body.model,
      price: req.body.price
    }
  );

  try {
    const newCanonCamera = await canoncamera.save();
    res.status(201).json(newCanonCamera);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a camera by ID
async function getCanonCamera(req, res, next) {
  let canoncamera;
  try {
    canoncamera = await CanonCamera.findById(req.params.id);
    if (canoncamera == null) {
      return res.status(404).json({ message: 'Cannot find canoncamera' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.canoncamera = canoncamera;
  next();
}

module.exports = router;
