const express = require('express');
const userModel = require('../models/User');
const bookingModel = require('../models/Booking');
const userMiddleware = require('../middlewares/User');
const coachMiddleware = require('../middlewares/Coach');
const { validateUser, validateBooking } = require('../Utils/Validator');
const router = express.Router();

// Registering the user
router.post('/', async (req, res) => {
  try {
    validateUser(req.body);

    const user = new userModel(req.body);
    const response = await user.save();

    res.status(201).json({
      message: response.userId,
    });
  } catch (error) {
    console.log(error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({
        message: 'User exists with this email id',
      });
    } else {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }
});

// logging the user
router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    const response = await userModel
      .findOne({ userId: id })
      .select({ password: 1, userId: 1 });

    if (!response || response.password != password) {
      res.status(404).json({ message: 'Incorrect user id or password' });
    } else {
      res.status(200).send(true);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong !');
  }
});

// Enables the user to make an appointment.
router.post(
  '/booking/:userId/:coachId',
  userMiddleware,
  coachMiddleware,
  async (req, res) => {
    try {
      const { userId, coachId } = req.params;
      validateBooking(req.body);

      // if slot appointment date and coach exist
      const x = await bookingModel.findOne({
        slot: req.body.slot,
        appointmentDate: req.body.appointmentDate,
        coachId,
      });
      // if slot appointment date and user exist
      const y = await bookingModel.findOne({
        slot: req.body.slot,
        appointmentDate: req.body.appointmentDate,
        userId,
      });
      console.log(x);
      console.log(y);

      if (x || y) {
        res
          .status(400)
          .json({ message: 'There is an appointment in this slot already' });
      } else {
        const booking = await new bookingModel({
          ...req.body,
          userId,
          coachId,
        }).save();
        if (booking) res.status(200).send(true);
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
);

// Returns the details of the user with provided user Id
router.get('/:userId', userMiddleware, async (req, res) => {
  try {
    res.status(200).json(res.user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong !');
  }
});

// Returns all the appointments made by the user with specified user id
router.get('/booking/:userId', userMiddleware, async (req, res) => {
  try {
    const bookings = await bookingModel.find({ userId: req.params.userId });

    if (bookings.length == 0) {
      res.status(400).json({
        message: 'Could not find any bookings',
      });
    } else {
      res.status(200).json(bookings);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
