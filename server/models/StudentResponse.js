const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema(
    {
        questionString: { type: String, required: true },
        answerString: { type: String },                     // the correct answer (not needed if response is correct answer)
        responseString: { type: String, required: true },   // the answer given by the student
        correct: { type: Boolean, required: true }
    },
    { _id: false }, 
    { timestamps: true }
);

const studentResponseSchema = new mongoose.Schema(
    {
        sessionID: { type: String, required: true },
        studentID: { type: String, required: true },
        studentFullName: { type: String, required: true },
        facialAuthSuccess: { type: Boolean, required: true },
        gpsSuccess: { type: Boolean, required: true },
        responses: [ {responseSchema} ]
    },
);

module.exports = mongoose.model('studentResponse', studentResponseSchema);