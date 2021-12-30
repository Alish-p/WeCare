const express = require('express');
const mongoose = require('mongoose');

const app = express();

//configuring environment variables
require('dotenv').config();

// db connection
(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database connected');
  } catch (error) {
    console.log(error);
  }
})();

// middlewares
app.use(express.json());

// routes
app.use('/coaches', require('./routes/coaches'));
app.use('/users', require('./routes/users'));
app.use('/booking', require('./routes/booking'));

app.listen(process.env.PORT, () =>
  console.log(`Server Started on port ${process.env.PORT}`)
);
