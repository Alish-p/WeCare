const { Schema, model } = require('mongoose');
const CounterModel = require('./Counter');

const coachSchema = new Schema({
  coachId: { type: String, immutable: true },
  name: { type: String, unique: true },
  password: String,
  gender: String,
  dateOfBirth: Date,
  mobileNumber: Number,
  speciality: String,
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
    const coachId = counter ? `CI-${counter.seq}` : 'CI-1';
    this.coachId = coachId;

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
