const bookingSchema = require('../models/Booking');

const bookingMiddleware = async (req, res, next) => {
  try {
    const bookingId = req.params.bookingId;
    const booking = await bookingSchema.findOne({ bookingId });

    if (booking) {
      // setting booking on response object
      res.booking = booking;
      next();
    } else {
      res.status(400).json({
        message: 'Booking Id does not exist',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = bookingMiddleware;
