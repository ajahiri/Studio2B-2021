const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
  {
    questionString: { type: String, required: true },
    answerString: { type: String, required: true }, // correct answer
    responseString: { type: String, required: true }, // student answer
    correct: { type: Boolean, required: true },
  },
  { _id: false },
  { timestamps: true },
);

const studentResponseSchema = new mongoose.Schema(
  {
    sessionID: { type: String, required: true },
    studentID: { type: String, required: true },
    studentFullName: { type: String, required: true },
    facialAuthSuccess: { type: Boolean, required: true },
    gpsSuccess: { type: Boolean, required: true },
    questionResponses: [responseSchema],
    studentLocation: [Number],
    sessionLocation: [Number],
    distance: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Response', studentResponseSchema);
