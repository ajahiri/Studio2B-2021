const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    questionString: { type: String, required: true },
    options: [{ type: String, required: true }],
    answer: { type: String, required: true },
  },
  { _id: false },
);

const locationSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  { _id: false },
);

const sessionSchema = new mongoose.Schema(
  {
    shortID: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    maxStudents: { type: Number, required: true },
    owner: { type: String, required: true }, // ID of teacher(owner) user obj
    participants: [String], // Array of student user IDs
    questions: [questionSchema],
    locationCoordinates: locationSchema,
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false },
    active: { type: Boolean, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Session', sessionSchema);
