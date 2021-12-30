const express = require('express');
const coachModel = require('../models/Coach');
const { validateCoach } = require('../Utils/Validator');
const router = express.Router();

// Enables the user to register to the application as a coach
router.post('/', async (req, res) => {
  try {
    validateCoach(req.body);
    const coach = new coachModel(req.body);

    const response = await coach.save();
    res.status(201).json({
      message: response.coachId,
    });
  } catch (error) {
    console.log(error);
    if (error.name === 'MongoServerError' && error.code === 11000) {
      res.status(400).json({
        message: 'Coach exists with this name',
      });
    } else {
      res.status(error.status).json({
        message: error.message,
      });
    }
  }
});

// Enables the user to login to the application
router.post('/login', async (req, res) => {
  try {
    const { id, password } = req.body;
    const response = await coachModel
      .findOne({ coachId: id })
      .select({ password: 1, coachId: 1 });

    if (!response || response.password != password) {
      res.status(404).json({ message: 'Incorrect coach id or password' });
    } else {
      res.status(200).send(true);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong !');
  }
});

// Enables the user to get the list of available coaches.
router.get('/all', async (req, res) => {
  try {
    const coaches = await coachModel.find();

    res.status(200).json(coaches);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong !');
  }
});

// Returns the details of the coach with provided coach Id
router.get('/:coachId', async (req, res) => {
  try {
    const coach = await coachModel.findOne({ coachId: req.params.coachId });

    if (coach) {
      res.status(200).json(coach);
    } else {
      res.status(400).json({ message: 'Coach Id does not exist' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong !');
  }
});

// Returns all the appointments made corresponding to the coach with specified coach Id
router.get('/booking/:coachId', (req, res) => {
  console.log('called');
  res.send('Hello world');
});

module.exports = router;
