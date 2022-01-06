const userSchema = require('../models/User');

const userMiddleware = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await userSchema.findOne({ userId });

    if (user) {
      // setting user on response object
      res.user = user;
      next();
    } else {
      res.status(400).json({
        message: 'User Id does not exist',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = userMiddleware;
