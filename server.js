const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Import and configure dotenv

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});
db.once('open', () => {
  console.log('Connected to Database');
});

// Define your routes
const canonCameraRouter = require('./routes/canonCamera');
const canonLensRouter = require('./routes/canonLens');
const finalPriceRouter = require('./routes/finalPrice');
const mobilenumberRouter = require('./routes/mobilenumber');
const nikonCameraRouter = require('./routes/nikonCamera');
const nikonLensRouter = require('./routes/nikonLens');
const sonyCameraRouter = require('./routes/sonyCamera');
const sonyLensRouter = require('./routes/sonyLens');

// Use the routes
app.use('/canonCamera', canonCameraRouter);
app.use('/canonLens', canonLensRouter);
app.use('/finalPrice', finalPriceRouter);
app.use('/mobilenumber', mobilenumberRouter);
app.use('/nikonCamera', nikonCameraRouter);
app.use('/nikonLens', nikonLensRouter);
app.use('/sonyCamera', sonyCameraRouter);
app.use('/sonyLens', sonyLensRouter);

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});


