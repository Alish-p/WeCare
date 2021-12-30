const { Schema, model } = require('mongoose');

const bookingSchema = new Schema({
  bookingId: String,
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

    this.bookingId = `BI-${counter.seq}`;

    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = model('booking', bookingSchema);
