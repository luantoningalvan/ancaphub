const mongoose = require('mongoose');

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
    time: {
      startAt: { type: Number, required: true },
      endAt: { type: Number, required: true },
    },
    locale: String,
    website: String,
    ticketPrice: [],
    interestedList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
      type: String,
      default: 'pending',
      lowercase: true,
      enum: ['published', 'pending', 'rejected', 'draft'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
