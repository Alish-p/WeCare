const coachSchema = require('../models/Coach');

const coachMiddleware = async (req, res, next) => {
  try {
    const coachId = req.params.coachId;
    const coach = await coachSchema.findOne({ coachId });

    if (coach) {
      // setting coach on response object
      res.coach = coach;
      next();
    } else {
      res.status(400).json({
        message: 'Coach Id does not exist',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = coachMiddleware;
