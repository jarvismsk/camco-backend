const express = require('express');
const router = express.Router();
const MobileNumber = require('../models/mobilenumber');

// Getting all MobileNumber
router.get('/', async (req, res) => {
  try {
    const mobilenumber = await MobileNumber.find();
    res.json(mobilenumber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting one mobilenumber
router.get('/:id', getMobileNumber, (req, res) => {
  res.json(res.mobilenumber);
});

// Creating a new mobilenumber
router.post('/', async (req, res) => {
  const mobilenumber = new MobileNumber({
    mobilenumber: req.body.mobilenumber,
    brand: req.body.brand,
    model: req.body.model,
    lenses: req.body.lenses || []
  });

  try {
    const newMobileNumber = await mobilenumber.save();
    res.status(201).json(newMobileNumber);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware function to get a mobilenumber by ID
async function getMobileNumber(req, res, next) {
  let mobilenumber;
  try {
    mobilenumber = await MobileNumber.findById(req.params.id);
    if (mobilenumber == null) {
      return res.status(404).json({ message: 'Cannot find MobileNumber' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.mobilenumber = mobilenumber;
  next();
}

module.exports = router;
