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

// Routes
// ... (your route configurations)

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});


