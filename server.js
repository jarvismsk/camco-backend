const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb+srv://Irfan:krishnajarvis@camco-server.hk3ogqk.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});
db.once('open', () => {
  console.log('Connected to Database');
});

// Routes
const nikoncameraRouter = require('./routes/nikonCamera');
app.use('/nikoncamera', nikoncameraRouter);

const canoncameraRouter = require('./routes/canonCamera');
app.use('/canoncamera', canoncameraRouter);

const sonycameraRouter = require('./routes/sonyCamera');
app.use('/sonycamera', sonycameraRouter);

const canonlensRouter = require('./routes/canonLens');
app.use('/canonlens', canonlensRouter);

const nikonlensRouter = require('./routes/nikonLens');
app.use('/nikonlens', nikonlensRouter);

const sonylensRouter = require('./routes/sonyLens');
app.use('/sonylens', sonylensRouter);

const mobilenumberRouter = require('./routes/mobilenumber');
app.use('/mobilenumber', mobilenumberRouter);

const finalPriceRoute = require('./routes/finalPrice');
app.use('/finalprice', finalPriceRoute);


// Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
