const express = require('express');
const router = express.Router();
const Location = require('../models/location');

// Getting all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one location
router.get('/:id', getLocation, (req, res) => {
  res.json(res.location);
});

// Creating a new location
router.post('/', async (req, res) => {
  const location = new Location({
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    address: req.body.address
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a location by ID
async function getLocation(req, res, next) {
  let location;
  try {
    location = await Location.findById(req.params.id);
    if (location == null) {
      return res.status(404).json({ message: 'Cannot find location' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.location = location;
  next();
}

module.exports = router;
