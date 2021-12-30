const { Schema, model } = require('mongoose');
const CounterModel = require('./Counter');

const coachSchema = new Schema({
  coachId: String,
  name: { type: String, unique: true },
  password: String,
  gender: String,
  dateOfBirth: Date,
  mobileNumber: Number,
  specialty: String,
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

// for creating incremental id
coachSchema.pre('save', async function (next) {
  try {
    const counter = await CounterModel.findByIdAndUpdate(
      { _id: 'CoachId' },
      { $inc: { seq: 1 } },
      { upsert: true }
    );

    this.coachId = `CI-${counter.seq}`;

    next();
  } catch (error) {
    return next(error);
  }
});

coachSchema.pre('updateOne', async function (next) {
  this.updatedAt = Date.now();

  next();
});

module.exports = model('coach', coachSchema);
