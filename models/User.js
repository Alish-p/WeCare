const { Schema, model } = require('mongoose');
const CounterModel = require('./Counter');

const userSchema = new Schema({
  userId: { type: String },
  name: String,
  password: String,
  gender: String,
  dateOfBirth: Date,
  email: { type: String, unique: true },
  mobileNumber: String,
  pinCode: Number,
  city: String,
  state: String,
  country: String,
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

// for creating incremental id
userSchema.pre('save', async function (next) {
  try {
    const counter = await CounterModel.findByIdAndUpdate(
      { _id: 'UserID' },
      { $inc: { seq: 1 } },
      { upsert: true }
    );

    this.userId = `UI-${counter.seq}`;

    console.log('object');
    console.log(this);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre('updateOne', async function (next) {
  this.updatedAt = Date.now();

  next();
});

module.exports = model('user', userSchema);
