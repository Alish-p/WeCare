const express = require('express');
const bookingMiddleware = require('../middlewares/Booking');
const bookingModel = require('../models/Booking');
const { validateBooking } = require('../Utils/Validator');

const router = express.Router();

router.put('/:bookingId', bookingMiddleware, async (req, res) => {
  try {
    const { slot: newSlot, appointmentDate: newAppointment } = req.body;
    validateBooking(req.body);

    // if slot appointment date and coach exist
    const x = await bookingModel.findOne({
      slot: req.body.slot,
      appointmentDate: req.body.appointmentDate,
      coachId: res.booking.coachId,
    });
    // if slot appointment date and user exist
    const y = await bookingModel.findOne({
      slot: req.body.slot,
      appointmentDate: req.body.appointmentDate,
      userId: res.booking.userId,
    });

    if (x || y) {
      res
        .status(400)
        .json({ message: 'There is an appointment in this slot already' });
    } else {
      const booking = await res.booking;
      booking.slot = newSlot;
      booking.appointmentDate = newAppointment;

      await booking.save();
      if (booking) res.status(200).send(true);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:bookingId', bookingMiddleware, async (req, res) => {
  try {
    await res.booking.remove();
    res.status(200).send(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
