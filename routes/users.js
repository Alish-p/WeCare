const express = require('express');
const userModel = require('../models/User');
const { validateUser } = require('../Utils/Validator');
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
router.post('/booking/:userId/:coachId', (req, res) => {
  console.log('called');
  res.send('Hello world');
});

// Returns the details of the user with provided user Id
router.get('/:userId', async (req, res) => {
  try {
    const user = await userModel.findOne({ userId: req.params.userId });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: 'User Id does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong !');
  }
});

// Returns all the appointments made by the user with specified user id
router.get('/booking/:userId/:coachId', (req, res) => {
  console.log('called');
  res.send('Hello world');
});

module.exports = router;
