const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected'],
    default: 'applied',
  },
  notes: {
    type: String,
    trim: true,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;