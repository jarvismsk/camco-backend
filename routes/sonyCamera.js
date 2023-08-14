const express = require('express');
const router = express.Router();
const SonyCamera = require('../models/sonyCamera');

// Getting all SonyCamera 
router.get('/', async (req, res) => {
  try {
    const sonycamera = await SonyCamera.find();
    res.json(sonycamera);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one SonyCamera 
router.get('/:id', getSonyCamera, (req, res) => {
  res.json(res.sonycamera);
});

// Creating a new camera
router.post('/', async (req, res) => {
  const sonycamera = new SonyCamera({
      model: req.body.model,
      price: req.body.price
    }
  );

  try {
    const newSonyCamera = await sonycamera.save();
    res.status(201).json(newSonyCamera);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a camera by ID
async function getSonyCamera(req, res, next) {
  let sonycamera;
  try {
    sonycamera = await SonyCamera.findById(req.params.id);
    if (sonycamera == null) {
      return res.status(404).json({ message: 'Cannot find SonyCamera' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.sonycamera = sonycamera;
  next();
}

module.exports = router;
