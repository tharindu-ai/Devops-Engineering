const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['conference', 'workshop', 'seminar', 'networking', 'meetup', 'webinar', 'training', 'concert'] },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // e.g., "09:00 AM"
  location: { type: String, required: true },
  image: { type: String, default: 'https://via.placeholder.com/500x300' },
  capacity: { type: Number, required: true, min: 1 },
  registrations: { type: Number, default: 0 },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'], default: 'published' },
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
