const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

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
app.use(cors());

// routes
app.use('/coaches', require('./routes/coaches'));
app.use('/users', require('./routes/users'));
app.use('/booking', require('./routes/booking'));

// handling invalid path
app.all('*', function (req, res) {
  res.status(404).json({
    message: 'Invalid path',
  });
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT, () =>
  console.log(`Server Started on port ${process.env.PORT}`)
);
