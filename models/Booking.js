const { Schema, model } = require('mongoose');
const CounterModel = require('./Counter');

const bookingSchema = new Schema({
  bookingId: { type: String, immutable: true },
  userId: String,
  coachId: String,
  appointmentDate: Date,
  slot: String,
});

// for creating incremental id
bookingSchema.pre('save', async function (next) {
  try {
    const counter = await CounterModel.findByIdAndUpdate(
      { _id: 'BookingId' },
      { $inc: { seq: 1 } },
      { upsert: true }
    );

    const bookingId = counter ? `BI-${counter.seq}` : 'BI-1';
    this.bookingId = bookingId;

    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = model('booking', bookingSchema);
