const express = require('express');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const router = express.Router();

const Session = require('../models/Session');
const verifyToken = require('./verifyToken');
const User = require('../models/User');
const { json } = require('express');

const sessionValidation = [
  check('name')
    .isLength({ min: 3 })
    .withMessage('Session/Class name must be greater than 3 chars.'),
  check('description')
    .isLength({ min: 3 })
    .withMessage('Must provide a valid class description.'),
  check('maxStudents')
    .isNumeric({ min: 1 })
    .withMessage('Must provide a valid class student maximum.'),
  check('questions')
    .isArray({ min: 1 })
    .withMessage(
      'Must have at least 1 question in array form for interactive authentication to work.',
    ),
];

router.post(
  '/createSession',
  verifyToken,
  sessionValidation,
  async (req, res) => {
    // Validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Get user object for checking perms
    const userObject = await User.findOne({ _id: req.user._id });

    if (!userObject) {
      return res.status(400).send({
        success: false,
        message: 'User not found.',
      });
    }

    try {
      // Get permission level, default to student if no exist
      const { permissionLevel = 'student' } = userObject;
      if (permissionLevel === 'student') {
        return res
          .status(401)
          .send('No permission to create a new class/session!');
      }

      console.log('creating a new session', req.body);

      // Create the new session associated with this teacher user
      const newClass = new Session({
        shortID: nanoid(10),
        name: req.body.name,
        description: req.body.description || 'test',
        maxStudents: req.body.maxStudents,
        locationCoordinates: req.body.locationCoordinates,
        owner: userObject._id,
        participants: [],
        questions: req.body.questions,
        startTime: null,
        endTime: null,
        active: false,
      });
      const savedSession = await newClass.save();
      console.log(savedSession);
      // Update user obj to add the session ID to their user obj
      await User.updateOne(
        { _id: userObject._id },
        { $push: { sessions: savedSession._id } },
        { upsert: true },
      );
      res
        .status(200)
        .send({ message: 'Session was saved to DB.', data: savedSession });
    } catch (error) {
      console.log('error creating session', error);
      res.status(400).send({ error });
    }
  },
);

const joinSessionValidation = [
  check('sessionCode')
    .isLength({ min: 10 })
    .withMessage('Session code is required, codes are minimum 10 characters.'),
];

// Reusable for getting session with some checks
const findAndGetSession = async (sessionCode, userObject, res) => {
  const isShortID = sessionCode.length === 10;
  const isValidObjectID = mongoose.Types.ObjectId.isValid(sessionCode);

  // If the ID is neither type, reject
  if (!isShortID && !isValidObjectID) {
    throw 'Invalid ID used.';
  }

  // Find that session, also don't send the participant list if student permission level
  const targetSession = await Session.findOne(
    isShortID ? { shortID: sessionCode } : { _id: sessionCode },
    userObject.permissionLevel === 'student' ? { participants: 0 } : {},
  );

  return targetSession;
};

router.post(
  '/joinSession',
  verifyToken,
  joinSessionValidation,
  async (req, res) => {
    // Validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Get user object for checking perms
    const userObject = await User.findOne({ _id: req.user._id });
    let targetSession;

    try {
      targetSession = await findAndGetSession(req.body.sessionCode, userObject);
    } catch (error) {
      return res.status(403).send(error);
    }

    // Check if user is already enrolled in that session
    if (userObject.sessions) {
      if (userObject.sessions.includes(req.body.sessionCode)) {
        return res.status(403).send('Cannot join session if already enrolled.');
      }
    }

    if (!targetSession) {
      return res.status(404).send('Session with that ID was not found.');
    }

    // Check for max students
    if (targetSession.participants.length >= targetSession.maxStudents)
      return res
        .status(403)
        .send('Max students was reached, cannot enroll to session.');

    // Add session ID to user object "sessions"
    await User.updateOne(
      { _id: userObject._id },
      { $push: { sessions: targetSession._id } },
      { upsert: true },
    );

    // Add user ID to session object "participants"
    await Session.updateOne(
      { _id: targetSession._id },
      { $push: { participants: userObject._id } },
      { upsert: true },
    );

    return res
      .status(200)
      .send({ message: 'Joined session', data: targetSession });
  },
);

router.post(
  '/getSession',
  verifyToken,
  joinSessionValidation,
  async (req, res) => {
    // Validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Get user object for checking perms
    const userObject = await User.findOne({ _id: req.user._id });

    let targetSession;

    try {
      targetSession = await findAndGetSession(req.body.sessionCode, userObject);
    } catch (error) {
      return res.status(403).send(error);
    }

    return res
      .status(200)
      .send({ message: 'Found session', data: targetSession });
  },
);

router.post('/getUserSessions', verifyToken, async (req, res) => {
  // Get user object for checking perms
  const userObject = await User.findOne({ _id: req.user._id });
  // const sessionData = [];
  // List of session IDs to get for each
  const { sessions } = userObject;

  // Map object ids
  sessions.map(session => {
    return mongoose.Types.ObjectId(session);
  });

  // Find all the sessions
  const sessionData = await Session.find({ _id: { $in: sessions } }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .send({ message: 'Session list gathered', data: sessionData });
});

const getSessionParticipantsValidation = [
  check('sessionID')
    .isLength({ min: 10 })
    .withMessage('Session code is required, codes are minimum 10 characters.'),
];
router.post(
  '/getSessionParticipants',
  verifyToken,
  getSessionParticipantsValidation,
  async (req, res) => {
    // Validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Get user object for checking perms
    const userObject = await User.findOne({ _id: req.user._id });

    const targetSession = await Session.findOne({ _id: req.body.sessionID });

    if (!userObject || userObject?.permissionLevel === 'student') {
      return res
        .status(401)
        .send('No permission to get this participant list!');
    }

    if (!targetSession) {
      return res.status(404).send('Session with that ID was not found.');
    }

    try {
      const userList = await User.find({
        _id: { $in: targetSession.participants },
      });
      const participantList = userList.map(user => {
        return `${user.firstName} ${user.lastName} (${user.email})`;
      });
      return res
        .status(200)
        .send({ message: 'Participant list gathered', data: participantList });
    } catch (error) {
      console.log('error getting mapping list of participants');
      return res.status(500).send('Error getting list of participants.');
    }
  },
);

module.exports = router;
