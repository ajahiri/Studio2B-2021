const express = require('express');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');
const { Mongoose } = require('mongoose');

const verifyToken = require('./verifyToken');

const JWT_SECRET = process.env.JWT_SECRET || 'some_secret';
if (JWT_SECRET === 'some_secret')
  console.log(
    'JWT SECRET IS NOT SECURE, PLEASE SET A SECURE SECRET IN .ENV FILE!',
  );

const registerValidation = [
  check('firstName')
    .isLength({ min: 3 })
    .withMessage('Your first name is required.'),
  check('lastName')
    .isLength({ min: 3 })
    .withMessage('Your last name is required.'),
  check('university')
    .isLength({ min: 3 })
    .withMessage('Your university name is required.'),
  check('email').isEmail().withMessage('Please provide a valid email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
    },
    JWT_SECRET,
  );
};

router.post('/register', registerValidation, async (req, res) => {
  // Validation check
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Check for users with duplicate emails
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res
      .status(400)
      .send({ success: false, message: 'Email already exists.' });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Default to 'student' permission level
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    university: req.body.university,
    email: req.body.email.toLowerCase(),
    password: hashPassword,
    permissionLevel: 'student',
  });

  try {
    const savedUser = await user.save();
    // create and assign a token to user
    const token = generateToken(savedUser);
    res.send({
      success: true,
      data: {
        id: savedUser._id,
        fullName: `${savedUser.firstName} ${savedUser.lastName}`,
        email: savedUser.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).send({ success: false, error });
  }
});

const loginValidation = [
  check('email').isEmail().withMessage('Please provide a valid email.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

router.post('/login', loginValidation, async (req, res) => {
  // Validation check
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // check if email exists
  const user = await User.findOne({ email: req.body.email.toLowerCase() });
  if (!user)
    return res.status(400).send({
      success: false,
      message: 'User with that email is not registered.',
    });

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    res
      .status(404)
      .send({ success: false, message: 'Invalid email or password' });

  // create and assign a token to user
  const token = generateToken(user);
  res.header('auth-token', token).send({
    success: true,
    message: 'Logged in successfully',
    token,
    data: {
      id: user._id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      permissionLevel: user.permissionLevel,
    },
  });
});

const getUserValidation = [
  check('userID')
    .isString()
    .optional(true)
    .withMessage('Please provide a valid user ID.'),
];

router.post('/getUser', verifyToken, getUserValidation, async (req, res) => {
  // With verifyToken middleware, we have access to user ID from token
  // Validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // console.log('about to get a user of ID:', req.body.userID);

  // Get user object for checking perms
  const userObject = await User.findOne({ _id: req.user._id }, { password: 0 });

  try {
    if (userObject.permissionLevel !== 'admin') {
      if (!req.body.userID || req.body.userID === req.user._id) {
        return res
          .status(200)
          .send({ message: 'Found user.', data: userObject });
      } else {
        return res
          .status(401)
          .send(
            'No permission to get user data other than your own, must be administrator.',
          );
      }
    } else {
      if (!req.body.userID)
        return res
          .status(200)
          .send({ message: 'Found user.', data: userObject });
      // Get user OBJ
      const targetUser = await User.findOne({ _id: req.body.userID });
      if (!targetUser) {
        return res.status(404).send('No user of that ID could be found.');
      }
      return res.status(200).send({ message: 'Found user.', data: targetUser });
    }
  } catch (error) {
    res.status(400).send({ message: 'Error while finding user.', error });
  }
});

const updateValidation = [
  check('firstName')
    .isLength({ min: 3 })
    .withMessage('Your first name is required.'),
  check('lastName')
    .isLength({ min: 3 })
    .withMessage('Your last name is required.'),
  check('university')
    .isLength({ min: 3 })
    .withMessage('Your university name is required.')
];

const passwordUpdateValidation = [
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.'),
];

const emailUpdateValidation = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
];

//Profile editing function - Enter a value for 'firstName', 'lastName' and 'univeristy'
router.put('/updateprofile', verifyToken, updateValidation, async (req, res) => {

  User.updateOne({_id: req.user._id}, {"$set": req.body})
    .then(async result => {
      const updatedObject = await User.findOne({_id: req.user._id});
      res.send({ success: true, data: updatedObject});
    })
    .catch(err => console.log(req.user))
});

//Password editing function
router.put('/updatepassword', verifyToken, passwordUpdateValidation, async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).send({errors: errors.array()})
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  User.updateOne({_id: req.user._id}, {$set: {"password": hashPassword}})
    .then(async result => {
      const updatedObject = await User.findOne({_id: req.user._id});
      res.send({ success: true, data: updatedObject});
    })
    .catch(err => console.log(req.user))
});

//Email editing function
router.put('/updateemail', verifyToken, emailUpdateValidation, async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).send({errors: errors.array()})
  }

  const user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send({
      success: false,
      message: 'User with that email is registered.',
    });

  User.updateOne({_id: req.user._id}, {$set: {"email": req.body.email}})
    .then(async result => {
      const updatedObject = await User.findOne({_id: req.user._id});
      res.send({ success: true, data: updatedObject});
    })
    .catch(err => console.log(req.user))
});

const updatePermissionsValidation = [
  check('permissionLevel').isIn(["student", "admin", "teacher"]).withMessage('Please set permissionLevel to student, teacher or admin'),
];

//Permission editing function, can only be used by admins.
router.put('/updatePermissions', verifyToken, updatePermissionsValidation, async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).send({errors: errors.array()})
  }

  const adminObject = await User.findOne({ _id: req.user._id });
  const targetObject = await User.findOne({_id: req.body.id});

  if (adminObject.permissionLevel != "admin") {
    return res
      .status(401)
      .send('Does not possess necessary permission to update permissions of other users.');
  }

  User.updateOne({_id: targetObject._id}, {$set: {"permissionLevel": req.body.permissionLevel}})
    .then(async result => {
      const updatedObject = await User.findOne({_id: req.body.id});
      res.send({ success: true, data: updatedObject});
    })
    .catch(err => console.log(err))
});

const searchValidation = [
  check('email').isLength({min: 1}).withMessage('Please enter a value to search by.'),
];

//Searches by email for users and returns the user/s found.
router.post('/userSearch', verifyToken, searchValidation, async (req, res) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(422).send({errors: errors.array()})
  }

  const adminObject = await User.findOne({ _id: req.user._id });

  if (adminObject.permissionLevel != "admin") {
    return res
      .status(401)
      .send('Does not possess necessary permission to update permissions of other users.');
  }

  const result = await User.find({email: {$regex: req.body.email}});
  res.send({ success: true, data: result});

});

module.exports = router;
