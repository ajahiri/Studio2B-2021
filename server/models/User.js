const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  university: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  permissionLevel: { type: String, default: 'student' },
  sessions: [String],
  authenticatedSessions: [String],
});

// Missing permissionLevel assumes "Student" permission

module.exports = mongoose.model('User', userSchema);
