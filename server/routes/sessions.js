const express = require('express');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const router = express.Router();

const Session = require('../models/Session');
const StudentResponse = require('../models/StudentResponse');
const verifyToken = require('./verifyToken');
const User = require('../models/User');
const { json } = require('express');

const turf = require('turf');

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
      return res
        .status(403)
        .send('Could not find and get session based on passed info.');
    }

    // Check if user is already enrolled in that session
    if (userObject.sessions) {
      if (userObject.sessions.includes(targetSession._id)) {
        return res.status(403).send('Cannot join session if already enrolled.');
      }
    }

    if (!targetSession) {
      return res.status(404).send('Session with that ID was not found.');
    }

    // Check for max students
    if (targetSession?.participants?.length >= targetSession.maxStudents)
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
      return res.status(403).send({ error: 'Could not find session' });
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
        return {
          name: `${user.firstName} ${user.lastName} (${user.email})`,
          studentID: user._id,
        };
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

const activateSessionByIDValidation = [
  check('sessionID')
    .isLength({ min: 10 })
    .withMessage('Session code is required, codes are minimum 10 characters.'),
  check('sessionBoolean')
    .isBoolean()
    .withMessage('Invalid session active state passed.'),
];
router.post(
  '/activateSessionByID',
  verifyToken,
  activateSessionByIDValidation,
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
      return res.status(401).send('No permission to activate this session!');
    }

    if (!targetSession) {
      return res.status(404).send('Session with that ID was not found.');
    }

    if (targetSession.owner !== req.user._id) {
      return res.status(401).send('No permission to activate this session!');
    }

    try {
      const updateResponse = await Session.updateOne(
        { _id: req.body.sessionID },
        { $set: { active: req.body.sessionBoolean } },
      );
      // console.log('No errors activating session', updateResponse);
      return res.status(200).send({
        message: 'Session was activated.',
        data: { success: true },
      });
    } catch (error) {
      console.log('Error activating session by ID.', error);
      return res.status(500).send('Error activating session.');
    }
  },
);

const studentResponseValidation = [
  check('sessionID')
    .isLength({ min: 10 })
    .withMessage('Session code is required, codes are minimum 10 characters.'),
  check('facialAuthResult')
    .isBoolean()
    .withMessage('Invalid facial auth state passed.'),
];
router.post(
  '/processResponse',
  verifyToken,
  studentResponseValidation,
  async (req, res) => {
    // Validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Get user object for checking perms
    const userObject = await User.findOne({ _id: req.user._id });

    const targetSession = await Session.findOne({ _id: req.body.sessionID });

    if (!targetSession) {
      return res.status(404).send('Session with that ID was not found.');
    }

    const foundExistingResponse = await StudentResponse.findOne({
      sessionID: targetSession._id,
      studentID: userObject._id,
    });

    if (foundExistingResponse)
      return res
        .status(403)
        .send('Error, you have already made a response for this session.');

    const {
      locationCoordinates: sessionCoordinates,
      questions,
    } = targetSession;
    if (!sessionCoordinates)
      return res
        .status(403)
        .send('Session has no location information, error occurred.');

    const {
      locationAuthResult: studentCoords,
      questionAnswer: studentQuestionAnswers,
    } = req.body;

    const sessionLocation = turf.point([
      sessionCoordinates.latitude,
      sessionCoordinates.longitude,
    ]);
    const studentLocation = turf.point([
      studentCoords.latitude,
      studentCoords.longitude,
    ]);

    const sphericalDistance = turf.distance(sessionLocation, studentLocation);

    let gpsSuccess = false;
    if (sphericalDistance < 0.5) gpsSuccess = true;

    const facialAuthSuccess = req.body.facialAuthResult || false;

    const questionResponses = [];

    // Check question answers
    questions.forEach((question, index) => {
      const responseObj = {
        questionString: question.questionString,
        answerString: question.answer,
        responseString: studentQuestionAnswers[index].responseString,
        correct:
          question.answer == studentQuestionAnswers[index].responseString,
      };
      questionResponses.push(responseObj);
    });

    const studentResponse = {
      sessionID: targetSession._id,
      studentID: userObject._id,
      studentFullName: `${userObject.firstName} ${userObject.lastName}`,
      facialAuthSuccess,
      gpsSuccess,
      questionResponses,
      studentLocation: studentLocation.geometry.coordinates,
      sessionLocation: sessionLocation.geometry.coordinates,
      distance: sphericalDistance,
    };

    try {
      console.log(studentResponse);
      const studentResponseObj = new StudentResponse(studentResponse);
      const savedResponse = await studentResponseObj.save();
      return res.status(200).send({
        message: 'Student response successfully recorded.',
        data: { success: true, data: savedResponse },
      });
    } catch (error) {
      console.log('Error saving student response.', error);
      return res.status(500).send('Error saving student response.');
    }
  },
);

const getStudentResponseValidation = [
  check('sessionID')
    .isLength({ min: 10 })
    .withMessage('Session code is required, codes are minimum 10 characters.'),
  check('studentID')
    .isLength({ min: 10 })
    .withMessage('Student ID is required, IDs are minimum 10 characters.'),
];
router.post(
  '/getStudentResponse',
  verifyToken,
  getStudentResponseValidation,
  async (req, res) => {
    // Validation check
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { sessionID, studentID } = req.body;

    // Get user object for checking perms
    const userObject = await User.findOne({ _id: req.user._id });

    const targetResponse = await StudentResponse.findOne({
      sessionID: sessionID,
      studentID: studentID,
    });

    const relatedSession = await Session.findOne({ _id: sessionID });

    // Checks and permission checks
    if (!targetResponse) {
      return res.status(404).send('Student response was not found.');
    }

    if (
      userObject.permissionLevel === 'student' &&
      targetResponse.studentID !== req.user._id
    ) {
      return res
        .status(403)
        .send('You do not have permission to view this response.');
    }

    if (
      userObject.permissionLevel === 'teacher' &&
      relatedSession.owner !== req.user._id
    ) {
      return res
        .status(403)
        .send('You do not have permission to view this response.');
    }

    try {
      return res.status(200).send({
        message: 'Student response successfully found.',
        data: { success: true, targetResponse },
      });
    } catch (error) {
      console.log('Error finding student response.', error);
      return res.status(500).send('Error finding student response.');
    }
  },
);

const checkResponseValidation = [
  check('sessionID')
    .isLength({ min: 10 })
    .withMessage('Session code is required, codes are minimum 10 characters.'),
  check('studentID')
    .isLength({ min: 10 })
    .withMessage('Student ID is required, IDs are minimum 10 characters.'),
];
router.post(
  '/checkResponse',
  verifyToken,
  checkResponseValidation,
  async (req, res) => {
    try {
      // Validation check
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { sessionID, studentID } = req.body;

      // Get user object for checking perms
      const userObject = await User.findOne({ _id: req.user._id });

      const targetResponse = await StudentResponse.findOne({
        sessionID: sessionID,
        studentID: studentID,
      });

      if (targetResponse) {
        res.status(200).send({
          message: 'Student response successfully found.',
          data: { success: true },
        });
      } else {
        res.status(200).send({
          message: 'No student response was found.',
          data: { success: false },
        });
      }
    } catch (error) {
      console.log('Error finding student response.', error);
      return res.status(500).send('Error finding student response.');
    }
  },
);

module.exports = router;
