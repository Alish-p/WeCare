const express = require('express');

const router = express.Router();

router.put('/:bookingId', (req, res) => {
  console.log('called');
  res.send('Hello world');
});

router.delete('/:bookingId', (req, res) => {
  console.log('called');
  res.send('Hello world');
});

module.exports = router;
